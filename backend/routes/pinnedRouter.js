import { Router } from 'express'
import { getPinnedMovies, getPinnedShowtime, postPinnedMovie, postPinnedShow, removePinnedMovie, removePinnedShow } from '../controllers/PinnedController.js'

const router = Router()

router.post('/movie', postPinnedMovie)      //group ID
router.get('/movie/:id', getPinnedMovies)       //group ID
router.delete('/movie/:id', removePinnedMovie)    //pinned ID

router.post('/showtime/:id', postPinnedShow)   //group ID
router.get('/showtime/:id', getPinnedShowtime)    //group ID
router.delete('/showtime/:id', removePinnedShow) //pinned ID


export default router