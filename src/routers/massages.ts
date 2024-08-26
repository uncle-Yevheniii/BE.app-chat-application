import express from 'express'
// import controller from '../controllers/massages'

export const router = express.Router()

router.post('/create')
router.get('/get')
router.get('/get/:chatId')
// router.patch('/update/:chatId')
// router.delete('/delete/:chatId')
