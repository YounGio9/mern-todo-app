const express = require('express')
const mongoose = require('mongoose')
const Todo = require('../models/Todo')

const todoRouter = express.Router()

// GET ALL TODOS FROM DATABASE

todoRouter.get('/todos', async (req, res, next) => {
   const allTodos = await Todo.find({})

   res.json({
      success: true,
      mesage: 'datas succesfully retrieved',
      data: allTodos,
   })
})


// GET A TODO BY HIS ID || RETRIEVE A UNIQUE TODO

todoRouter.get('/todos/:id', async (req, res) => {
   await Todo.findById(req.params.id)
      .select({ __v: 0 })
      .then((todo) => {
         if (!todo) res.json({ success: true, message: "Todo doesn't exist" })
         res.json({
            success: true,
            status: 200,
            message: 'Data Successfully retrieved',
            data: todo,
         })
      })
      .catch((err) => {
         console.log(err)
         res.json({ sucess: false, error: "Todo doesn't exist" })
      })
})


// CREATE A NEW TODO

todoRouter.post('/todos', async (req, res) => {
   const { name, completed } = req.body

   const t = await Todo.findOne({ name }).select({ __v: 0 })

   if (t == null) {
      let todo = new Todo({ name, completed })

      todo
         .save()
         .then(async (todo) => {
            res.json({
               success: true,
               status: 201,
               message: 'Todo Successfully added',
               data: await Todo.findOne({ name }).select({ __v: 0 }),
            })
         })
         .catch((err) => {
            const getError = () => {
               if (name == null) return 'Field [name] is required'
               if (completed == null) return 'Field [completed] is required'
               return null
            }

            res.json({
               success: false,
               message: getError() ?? 'Bad request',
            })
         })
   } else {
      res.json({
         success: true,
         status: 200,
         message: 'Todo with this name already exists',
      })
   }
})


// UPDATE A TODO 

todoRouter.put('/todos/:id', async (req, res) => {
    const {id} = req.params
   const { name, completed } = req.body

   const update = {}
   if (name != null) update.name = name
   if (completed != null) update.completed = completed


   const t = await Todo.findOne({_id: id })

   if(t == null) {
        return res.json({
           success: false,
           status: 200,
           message: 'Todo with this id doesn\'t exists',
        })
   }

   await Todo.findOneAndUpdate({ _id: req.params.id }, update, {
      new: true,
   })
      .then((todo) => {
         res.json({
            success: true,
            message: 'Todo Successfully added',
            data: todo,
         })
      })
      .catch((err) => {
        console.error(err)
         res.json({
            success: false,
            message: 'Bad request',
         })
      })
})


// DELETE A TODO 

todoRouter.delete('/todos/:id', async (req, res) => {
    const {id} = req.params

    const t = await Todo.findOne({_id: id })

   if(t == null) {
        return res.json({
           success: true,
           status: 200,
           message: 'Todo with this id doesn\'t exists',
        })
   }

   await Todo.findOneAndDelete({_id: id}).then(data => {
        res.json({
            success: true,
            message: 'Todo successfully deleted'
        })
   }).catch(err => {
        console.log(err)
        res.json({
            success: false,
            message: 'Bad request',
        })
   })


})



module.exports = todoRouter
