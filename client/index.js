class Todo {
  getTodos = async () => {
    const response = await fetch("http://localhost:7777/api/todos");
    const resToJson = await response.json();
    return resToJson.todos;
  };
  addTodo = (value) => {
    fetch("http://localhost:7777/api/todos", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ value }),
    }).then(() => {
      this.render();
      value = null;
      const input = document.querySelector(".addInput");
      input.value = null;
    });
  };
  edit = (id) => {
    fetch(`http://localhost:7777/api/todo/edit/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
    }).then(() => {
      this.render();
    });
  };
  deleteTodo = (id) => {
    fetch(`http://localhost:7777/api/todos/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then(() => {
      this.render();
    });
  };
  saveTodo = (id, value) => {
    fetch(`http://localhost:7777/api/todos/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ value }),
    }).then(() => {
      this.render();
    });
  };
  check = (id) => {
    fetch(`http://localhost:7777/api/todo/check/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
    }).then(() => {
      this.render();
    });
  };
  showTodos = async () => {
    let dom = "";
    const todos = await this.getTodos();
    todos.forEach((todo) => {
      dom += `
      <div class="todo" id=${todo.id}>
      ${
        todo.isEditing
          ? `<div class="editing">
          <form>
            <input
              onchange ="handleTodoChange(event)"
              type="text"
              placeholder="todo"
              class="editInput"
              name="todo"
              required
              value=${todo.value}
            />
            <input id=${todo.id} onclick="saveTodo(event)" type="submit" value="Save" class="button save" />
          </form>
        </div>`
          : `
            <p title="Click to check" onclick="check(${todo.id})" class="text ${
              todo.done ? "done" : ""
            }">${todo.value}</p>
            <div class="actionButtons">
              <button onclick="edit('${
                todo.id
              }')" class="edit button">Edit</button>
              <button onclick="deleteTodo('${
                todo.id
              }')" class="delete button">Delete</button>
            </div>
          `
      }
      </div>
      `;
    });
    return dom;
  };

  render = async () => {
    const dom = await this.showTodos();
    const root = document.querySelector(".todos");
    root.innerHTML = dom;
  };
}

const app = new Todo();

app.render();
