import { Router } from 'express'
import { postRegistration, postLogin, getUserByGroup } from '../controllers/UserController.js'

const router = Router()

router.post('/register', postRegistration)
router.post('/login', postLogin)
router.get('/group/:id', getUserByGroup)
export default router