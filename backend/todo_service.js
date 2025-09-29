const { ObjectId } = require('mongodb');
const {getTodosCollection} = require('./connect_DataBase.js');

async function getTodosByUser(req, res){
    const collection = await getTodosCollection();
    if(!collection) return res.status(500).json({error: 'Помилка серверу'}); 
    const todos = await collection.find({ author_id: new ObjectId(req.author_id)}).toArray();
    if(!todos) return res.status(500).json({error: 'Помилка серверу'}); 
    res.status(200).json({todos: todos});
    
};

async function getOneTodoByID(id){
    const collection = await getTodosCollection();
    if(!collection) return null;
    const user = await collection.findOne({ _id: new ObjectId(id) });
    return user;
}

async function addTodo(req, res){
    const body = req.body;
    if(!body || !body.todo) return res.sendStatus(400);
    const todo = body.todo
    const collection = await getTodosCollection();
    if(!collection) return res.status(500).json({error: 'Помилка серверу'}); 
    const todoObject = {author_id: new ObjectId(req.author_id), todo: todo, mark: false};    
    await collection.insertOne(todoObject);
    res.sendStatus(200);
};

async function editTodoById(req, res){
    const params = req.params;
    const body = req.body;
    if(!body || !body.todo || !params.id) return res.sendStatus(400);
    const id = params.id;
    const todo = body.todo;
    const oldTodoObject = await getOneTodoByID(id);
    if(!oldTodoObject || String(oldTodoObject.author_id) != req.author_id) return res.sendStatus(400);

    const collection = await getTodosCollection();
    if(!collection) return res.status(500).json({error: 'Помилка серверу'}); 
    await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: {todo} }
      );
    res.sendStatus(200);
};


async function deleteTodoById(req, res){
    const params = req.params;
    if(!params.id) return res.sendStatus(400);
    const id = params.id;
    const todoObject = await getOneTodoByID(id);
    if(!todoObject || String(todoObject.author_id) != req.author_id) return res.sendStatus(400);
    const collection = await getTodosCollection();
    if(!collection) return res.status(500).json({error: 'Помилка серверу'}); 
    await collection.deleteOne({ _id: new ObjectId(id) });
    res.sendStatus(200);
};


async function markTodoById(req, res){
    const params = req.params;
    if(!params.id) return res.sendStatus(400);
    const id = params.id;
    const oldTodoObject = await getOneTodoByID(id);
    if(!oldTodoObject || String(oldTodoObject.author_id) != req.author_id) return res.sendStatus(400);
    const newMarkValue = !oldTodoObject.mark;

    const collection = await getTodosCollection();
    if(!collection) return res.status(500).json({error: 'Помилка серверу'}); 
    await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: {mark: newMarkValue}}
      );
      res.sendStatus(200);
};

module.exports = {getTodosByUser, addTodo, editTodoById, deleteTodoById, markTodoById};