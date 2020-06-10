function createElement(tag, props, ...children) {
  const element = document.createElement(tag);

  // console.log(Object.keys(props));
  Object.keys(props).forEach(key => element[key] = props[key]);

  // console.log(tag, props, children);
  if(children.length > 0) {
    children.forEach(child => {
      if(typeof child === 'string') {
        child = document.createTextNode(child);
      }
      element.appendChild(child);
    });
  }

  return element;
}

function createTodoItem(title) {
  const checkbox = createElement('input', { type: 'checkbox', className: 'checkbox' });
  const label = createElement('label', { className: 'title' }, title );
  const editInput = createElement('input', { type: 'text', className: 'textfield' });
  const editButton = createElement('button', { className: 'edit' }, 'Изменить');
  const deleteButton = createElement('button', {className: 'delete'}, 'Удалить');
  const listItem = createElement('li', { className: 'todo-item' }, checkbox, label, editInput, editButton, deleteButton);

  // console.log(listItem);
  bindEvents(listItem);

  return listItem;
}

function bindEvents(todoItem) {
  const checkbox = todoItem.querySelector('.checkbox');
  const editButton = todoItem.querySelector('button.edit');
  const deleteButton = todoItem.querySelector('button.delete');

  checkbox.addEventListener('change', toggleTodoItem);
  editButton.addEventListener('click', editTodoItem);
  deleteButton.addEventListener('click', deleteTodoItem);

}

function addTodoItem(event) {
  event.preventDefault(); /* Dont reload page after request */

  if (addInput.value === '') return alert('Необходимо ввести название задачи.');

  const todoItem = createTodoItem(addInput.value);
  todoList.appendChild(todoItem);
  addInput.value = '';
}

function toggleTodoItem() {
  console.log(this);
  const listItem = this.parentNode;
  listItem.classList.toggle('completed');
}

function editTodoItem() {
  const listItem = this.parentNode;
  const title = listItem.querySelector('.title');
  const editInput = listItem.querySelector('.textfield');
  const isEditing = listItem.classList.contains('editing');

  if(isEditing) {
    title.innerText = editInput.value;
    this.innerText = 'Изменить';
  } else {
    editInput.value = title.innerText;
    this.innerText = 'Сохранить';
  }

  listItem.classList.toggle('editing');
}

function deleteTodoItem() {
  const listItem = this.parentNode;
  todoList.removeChild(listItem);
}

function load() {
  const data = JSON.parse(localStorage.getItem('todos'));
  return data;
}

function save(data) {
  const string = JSON.stringify(data);
  localStorage.setItem('todos', string);
}

const todoform = document.getElementById('todo-form');
const addInput = document.getElementById('add-input');
const todoList = document.getElementById('todo-list');
const todoItem = document.querySelectorAll('.todo-item');

function main() {
  todoform.addEventListener('submit', addTodoItem);
  todoItem.forEach(item => bindEvents(item));
}

main();