const { Router } = require("express");
const router = Router();
const { customAlphabet } = require("nanoid");
let { todos } = require("../globalVar/todos");
const nanoid = customAlphabet("qwertyuiopasdfghjklzxcvbnm", 5);
router
  .route("/api/todos")
  .get((req, res) => {
    res.status(200).send({ todos });
  })
  .post((req, res) => {
    if (req.body.value.trim() !== "") {
      todos = [
        ...todos,
        { value: req.body.value, id: nanoid(5), done: false, isEditing: false },
      ];
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, error: "Enter Valid Value" });
    }
  });

router.route("/api/todo/edit/:id").put((req, res) => {
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.isEditing = true;
    todos
      .filter((todo) => todo.id !== id)
      .map((todo) => (todo.isEditing = false));
    res.status(200).json({ success: true });
  } else {
    res.status(404).json({ success: false, error: "No such Todo" });
  }
});

router
  .route("/api/todos/:id")
  .delete((req, res) => {
    const id = req.params.id;
    todos = todos.filter((todo) => todo.id !== id);
    res.status(200).json({ success: true });
  })
  .put((req, res) => {
    const id = req.params.id;
    todo = todos.find((todo) => todo.id === id);
    if (todo) {
      if (req.body.value) {
        if (req.body.value.trim() === "") {
          todos = todos.filter((todo) => todo.id !== id);
          res
            .status(200)
            .json({ success: true, message: "Deleted due to empty input" });
        }
        todo.value = req.body.value;
        todo.isEditing = false;
        res.status(200).json({ success: true });
      } else {
        todo.isEditing = false;
        res.status(200).json({ success: true });
      }
    } else {
      res.status(418).json({ success: true, error: "I'm a teapot :D" });
    }
  });

router.route("/api/todo/check/:id").put((req, res) => {
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.done = !todo.done;
    res.status(200).json({ success: true });
  } else {
    res.status(404).json({ success: false, error: "Todo Not Found :(" });
  }
});
module.exports = router;
