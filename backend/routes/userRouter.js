import { Router } from 'express'
import { postRegistration, postLogin, deleteUser, getUserByGroup } from '../controllers/UserController.js'

const router = Router()

router.post('/register', postRegistration)
router.post('/login', postLogin)
router.delete('/delete', deleteUser)
router.get('/group/:id', getUserByGroup)
export default router