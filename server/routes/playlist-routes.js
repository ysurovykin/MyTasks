const Router = require('express').Router
const router = new Router();
const playlistController = require('../controllers/playlist-controller')


router.post('/create', playlistController.create)
router.put('/update', playlistController.update)
router.delete('/delete/:id', playlistController.delete)
router.get('/get/:id', playlistController.getById)
router.get('/getAll/:iduser', playlistController.getAll)

module.exports = router;