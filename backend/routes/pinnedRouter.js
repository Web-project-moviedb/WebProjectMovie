import { Router } from 'express'
import { getPinnedMovie, getPinnedShowtime, postPinnedMovie, postPinnedShow, removePinnedMovie, removePinnedShow } from '../controllers/PinnedController.js'

const router = Router()

router.post('/movie/:id', postPinnedMovie)      //group ID
router.get('/movie/:id', getPinnedMovie)       //group ID
router.delete('/movie/:id', removePinnedMovie)    //pinned ID

router.post('/showtime/:id', postPinnedShow)   //group ID
router.get('/showtime/:id', getPinnedShowtime)    //group ID
router.delete('/showtime/:id', removePinnedShow) //pinned ID


export default router