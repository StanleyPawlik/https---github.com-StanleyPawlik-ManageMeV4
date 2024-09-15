// const app = document.querySelector<HTMLDivElement>('#app')!;

const getAllTasksBtn = document.getElementById('get-tasks-btn') as HTMLButtonElement;
const tasksContainer = document.getElementById('tasks-container') as HTMLDivElement;
const createTaskBtn = document.getElementById('create-task-btn') as HTMLButtonElement;
const updateTaskBtn = document.getElementById('update-task-btn') as HTMLButtonElement;
const deleteTaskBtn = document.getElementById('delete-task-btn') as HTMLButtonElement;

const taskDateInput = document.getElementById('task-date') as HTMLInputElement;
const taskIdInput = document.getElementById('task-id') as HTMLInputElement;
const taskNameInput = document.getElementById('task-name') as HTMLInputElement;
const taskDescriptionInput = document.getElementById('task-description') as HTMLInputElement;
const taskDetails = document.getElementById('task-details') as HTMLDivElement;


interface Task {
  _id: string;
  name: string;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface NewTask {
  name: string;
  description: string;
}

// GET ALL TASKS

getAllTasksBtn.addEventListener('click', () => {
  fetch('http://localhost:3000/tasks')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json() as Promise<Task[]>;
    })
    .then((data: Task[]) => {
      tasksContainer.innerHTML = '';
      if (data.length === 0) {
        tasksContainer.innerHTML = '<p>No tasks here. Try creating new ones.</p>';
        return;
      }
      data.forEach((task: Task) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
          <h3>${task.name}</h3>
          <p>Description: ${task.description}</p>
          <p>Created At: ${new Date(task.createdAt).toLocaleString()}</p>
          <p>Due Date: ${new Date(task.date).toLocaleString()}</p>
          <p>Status: ${new Date(task.date) < new Date() ? 'Overdue' : 'Pending'}</p>
        `;
        tasksContainer.appendChild(taskElement);
      });
    })
    .catch((error: Error) => {
      console.error('Error fetching tasks:', error);
      tasksContainer.innerHTML = '<p>Error loading tasks.</p>';
    });
});


// CREATE ONE TASK

const createOneTask = async (newTask: NewTask): Promise<Task> => {
  try {
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });
    if (!response.ok) {
      throw new Error('Error creating task');
    }
    const createdTask: Task = await response.json();
    return createdTask;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

createTaskBtn.addEventListener('click', async () => {
  const newTask = {
    name: taskNameInput.value,
    description: taskDescriptionInput.value,
    date: new Date(taskDateInput.value).toISOString()
  };

  try {
    const createdTask = await createOneTask(newTask);
    taskDetails.innerHTML = `<p>Task created successfully: ${createdTask.name}</p>`;
  } catch (error) {
    taskDetails.innerHTML = `<p>Error creating task: ${error}</p>`;
  }
});


// UPDATE ONE TASK

const updateOneTask = async (_id: string, updatedTask: Partial<Task>): Promise<Task> => {
  try {
    const response = await fetch(`http://localhost:3000/tasks/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });
    if (!response.ok) {
      throw new Error('Error updating task');
    }
    const task: Task = await response.json();
    return task;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

updateTaskBtn.addEventListener('click', async () => {
  const taskId = taskIdInput.value;
  const updatedTask = {
    name: taskNameInput.value,
    description: taskDescriptionInput.value,
    date: new Date(taskDateInput.value).toISOString()
  };

  try {
    const updatedTaskResponse = await updateOneTask(taskId, updatedTask);
    taskDetails.innerHTML = `<p>Task updated successfully: ${updatedTaskResponse.name}</p>`;
  } catch (error) {
    taskDetails.innerHTML = `<p>Error updating task: ${error}</p>`;
  }
});

// DELETE ONE TASK

const deleteOneTask = async (_id: string): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:3000/tasks/${_id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error deleting task');
    }
    console.log(`Task ${_id} deleted successfully.`);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

deleteTaskBtn.addEventListener('click', async () => {
  const taskId = taskIdInput.value;

  try {
    await deleteOneTask(taskId);
    taskDetails.innerHTML = `<p>Task deleted successfully</p>`;
  } catch (error) {
    taskDetails.innerHTML = `<p>Error deleting task: ${error}</p>`;
  }
});