import express from 'express'
import controller from '../controllers/chat'

export const router = express.Router()

router.get('/start', controller.StartChat)

router.post('/create', controller.CreateChat)
router.get('/get', controller.GetAllChat)
router.get('/get/:chatId', controller.GetChat)
router.patch('/update/:chatId', controller.UpdateChat)
router.delete('/delete/:chatId', controller.DeleteChat)
