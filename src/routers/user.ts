import express from 'express'
import controller from '../controllers/user'

export const router = express.Router()

router.post('/create', controller.CreateUser)
router.get('/get', controller.ReadAll)
router.get('/get/:userId', controller.ReadUser)
router.patch('/update/:userId', controller.UpdateUser)
router.delete('/delete/:userId', controller.DeleteUser)


