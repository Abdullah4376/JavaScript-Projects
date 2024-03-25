const inputBox = document.querySelector('#inputBox');
const inputAdd = document.querySelector('.inputAdd');
const tasks = document.querySelector('.tasks');

function addTodo() {
  const todo = inputBox.value.trim();

  if (!todo) {
    alert("Please write something in the text field!");
    return;
  }

  const li = document.createElement('li');
  li.innerHTML = `
  <div>
    <input type="checkbox" class="task-checkbox">
    <label for="task${tasks.children.length + 1}">${todo}</label>
  </div>
  <button class="delete">&#10005;</button>
  `;
  tasks.appendChild(li);

  // Store new task in local storage (append to the end):
  const todosArray = localStorage.getItem('todos')?.split(',') || [];
  todosArray.push(todo);
  localStorage.setItem('todos', todosArray.join(','));

  inputBox.value = '';
}

inputAdd.addEventListener('click', addTodo);

tasks.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete')) {
    // Handle potential null case for previous sibling
    const deleteIndex = event.target.parentElement ?
      event.target.parentElement.children[0].tabIndex - 1 : null;

    if (deleteIndex !== null) {
      event.target.parentElement.remove();

      const todosArray = localStorage.getItem('todos')?.split(',') || [];
      todosArray.splice(deleteIndex, ); // Remove the task at the correct index
      localStorage.setItem('todos', todosArray.join(','));
    }
  } else if (event.target.classList.contains('task-checkbox')) {
    const checkbox = event.target;
    let taskText = checkbox.nextElementSibling.textContent;
    const isCompleted = checkbox.checked;

    if (isCompleted) {
      checkbox.parentElement.style.textDecoration = 'line-through';
      taskText = `completed-${taskText}`; // Add marker for completed state
    } else {
      checkbox.parentElement.style.textDecoration = 'none';
      taskText = taskText.replace(/^completed-/, ''); // Remove marker on uncheck
    }

    const todosArray = localStorage.getItem('todos')?.split(',') || [];
    const todoIndex = todosArray.indexOf(taskText.replace(/^completed-/, '')); // Find by text (remove marker)
    todosArray[todoIndex] = taskText; // Update the task with the marker (optional)
    localStorage.setItem('todos', todosArray.join(','));
  }
});

// Load tasks from local storage on page load (optional)
const storedTodos = localStorage.getItem('todos') || '';
const todosArray = storedTodos.split(','); // Split stored string into array (if any)
todosArray.forEach(todo => {
  const li = document.createElement('li');
  const isCompleted = todo.startsWith('completed-'); // Check for marker (optional)
  const taskText = isCompleted ? todo.replace(/^completed-/, '') : todo;
  li.innerHTML = `
  <div>
    <input type="checkbox" class="task-checkbox" ${isCompleted ? 'checked' : ''}>
    <label for="task${tasks.children.length + 1}">${taskText}</label>
  </div>
  <button class="delete">&#10005;</button>
  `;
  tasks.appendChild(li);
});
