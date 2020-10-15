const initialState = {
  addFormValue: null,
  todoChangeValue: null,
};

const addFormHandle = (e) => {
  initialState.addFormValue = e.target.value;
};

const addForm = document.querySelector("#addForm");
addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  app.addTodo(initialState.addFormValue);
});

const handleTodoChange = (e) => {
  initialState.todoChangeValue = e.target.value;
};
const edit = (id) => {
  app.edit(id);
};
const saveTodo = (event) => {
  event.preventDefault();
  app.saveTodo(event.target.id, initialState.todoChangeValue);
  initialState.todoChangeValue = null;
};
const deleteTodo = (id) => {
  app.deleteTodo(id);
};
const check = (e) => {
  app.check(e.id);
};
