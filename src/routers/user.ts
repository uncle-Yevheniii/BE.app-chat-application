import express from 'express'
import controller from '../controllers/user'
import { Schema, ValidationSchema } from '../middlewares/validation-schema'

export const router = express.Router()

router.post('/create', ValidationSchema(Schema.user.create), controller.CreateUser)
router.get('/get', controller.ReadAll)
router.get('/get/:userId', controller.ReadUser)
router.patch('/update/:userId', ValidationSchema(Schema.user.update), controller.UpdateUser)
router.delete('/delete/:userId', controller.DeleteUser)
