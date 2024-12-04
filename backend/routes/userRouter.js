import { Router } from 'express'
import { postRegistration, postLogin, getAllGroupsByUser, deleteUser, postInvite, acceptInvite, declineInvite, getAllUsersToMembers, getUsernameById } from '../controllers/UserController.js'

const router = Router()

router.post('/register', postRegistration)
router.post('/login', postLogin)
router.delete('/delete', deleteUser)
router.get('/group/:id', getAllGroupsByUser)

// Invite routes. These should maybe be moved to a separate file or to group controller
router.post('/invite', postInvite)
router.put('/invite/:id', acceptInvite)
router.delete('/invite/:id', declineInvite)

//members list
router.get('/members', getAllUsersToMembers)
router.get('/username/:id', getUsernameById)

export default router