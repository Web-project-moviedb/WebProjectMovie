import { Router } from 'express'
import { postRegistration, postLogin, deleteUser } from '../controllers/UserController.js'

const router = Router()

router.post('/register', postRegistration)
router.post('/login', postLogin)
router.delete('/delete', deleteUser)

export default router