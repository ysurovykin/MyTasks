const Router = require('express').Router
const router = new Router();
const playlistController = require('../controllers/playlist-controller')

const multer = require('multer')

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/albumImages');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    },
})

const upload = multer({ storage: fileStorage })


router.post('/create', playlistController.create)
router.put('/uploadImage/:idplaylist', upload.single('image'), playlistController.uploadImage)
router.put('/update', playlistController.update)
router.delete('/delete/:id', playlistController.delete)
router.get('/get/:id', playlistController.getById)
router.get('/getAll/:iduser', playlistController.getAll)

module.exports = router;