import { Router } from 'express'
import { postGroup, getGroup, removeGroup } from '../controllers/GroupController.js'

const router = Router()

router.post('/', postGroup)
router.get('/:id', getGroup)
router.delete('/:id', removeGroup)


export default router