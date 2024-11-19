import { Router } from 'express'
import { postRegistration, postLogin, getUserByGroup, deleteUser, postInvite, acceptInvite, declineInvite } from '../controllers/UserController.js'

const router = Router()

router.post('/register', postRegistration)
router.post('/login', postLogin)
router.delete('/delete', deleteUser)
router.get('/group/:id', getUserByGroup)
router.post('/invite', postInvite)
router.put('/invite', acceptInvite)
router.delete('invite', declineInvite)
export default router