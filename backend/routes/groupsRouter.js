import { Router } from 'express'
import { getAllGroups, getAllGroupsByUser } from '../controllers/GroupController.js'

const router = Router()

router.get('/', getAllGroups)
router.get('/:id', getAllGroupsByUser)

export default router