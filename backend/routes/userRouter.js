import { Router } from 'express'
import { postRegistration, postLogin, getAllGroupsByUser, deleteUser, postInvite, acceptInvite, declineInvite } from '../controllers/UserController.js'

const router = Router()

router.post('/register', postRegistration)
router.post('/login', postLogin)
router.delete('/delete', deleteUser)
router.get('/group/:id', getAllGroupsByUser)

// Invite routes. These should maybe be moved to a separate file or to group controller
router.post('/invite', postInvite)
router.put('/invite', acceptInvite)
router.delete('/invite:id', declineInvite)

export default router