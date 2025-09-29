const { Router } = require('express');
const { register, login } = require('./auth_service.js');
const { getTodosByUser, addTodo, editTodoById, deleteTodoById, markTodoById } = require('./todo_service.js');
const { checkAuth } = require('./middleware.js');
const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/getTodos', checkAuth, getTodosByUser);
router.post('/addTodo', checkAuth, addTodo);
router.post('/editTodo/:id', checkAuth, editTodoById);
router.get('/deleteTodo/:id', checkAuth, deleteTodoById);
router.get('/markTodo/:id', checkAuth, markTodoById);

module.exports = router;