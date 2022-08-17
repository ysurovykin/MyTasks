const Router = require('express').Router
const router = new Router();
const taskController = require('../controllers/task-controller')


router.post('/create', taskController.create)

router.put('/update', taskController.update)
router.put('/complete', taskController.setComplete)

router.delete('/delete/:id', taskController.delete)

router.get('/getByDate/:date', taskController.getByDate)
router.get('/getByPlaylist/:idplaylist', taskController.getByPlaylist)
router.get('/getCompleted/:iduser/:period', taskController.getCompleted)
router.get('/getFailed/:iduser/:period', taskController.getFailed)
router.get('/getPlaned/:iduser/:period', taskController.getPlaned)
router.get('/getDaysScheduled/:iduser/:period', taskController.getDaysScheduled)

module.exports = router;