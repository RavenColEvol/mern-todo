const jwt_decode = require("jwt-decode");

const router = require('express').Router()
const Todo = require('../models/todo.models')

// All Todos
router.get('/', (req, res) => {
    const decode = jwt_decode(req.headers.authorization.split(' ')[1]);
    user_id = decode['id'];
    Todo.find({owner_id:user_id})
    .then(todos => {
        return res.json({'todos':todos})
    })
    .catch(err => res.status(400).json({'err':err}))    
})


// Add Todo
router.post('/todos/add-todo', (req, res) => {
    Todo.create(req.body)
    .then(e => {
        res.json({
            'message': 'Successfully Added !',
            'todo': e
        })
    })
    .catch(err => res.status(400).json({'err':err}))
})


// Detail Todo
router.get('/todos/:id', (req, res) => {
    Todo.find({_id:req.params.id})
    .then(todo => res.json({'todo' : todo}))
    .catch(err => res.status(400).json({'err': err}))
})


// Delete Todo
router.post('/todos/delete-todo', (req, res) => {
    Todo.deleteOne({_id:req.body.id})
    .then(todo => res.json({'message': 'Todo Deleted Successfully !'}))
    .catch(err => res.status(400).json({'err': err}))
})


// Update Todo
router.post('/todos/update-todo', (req, res) => {
    Todo.replaceOne({_id:req.body._id}, req.body)
    .then(e => res.json({
        'message': 'Successfully Updated !',
        'todo': e
    }))
    .catch(err => res.status(400).json({'err':err}))
})


module.exports = router;
