import { Router } from 'express'
import { postRegistration, postLogin, deleteUser, getAllGroupsByUser } from '../controllers/UserController.js'

const router = Router()

router.post('/register', postRegistration)
router.post('/login', postLogin)
router.delete('/delete', deleteUser)
router.get('/group/:id', getAllGroupsByUser)
export default router