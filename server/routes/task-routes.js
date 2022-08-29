const Router = require('express').Router
const router = new Router();
const taskController = require('../controllers/task-controller')


router.post('/create', taskController.create)

router.put('/update', taskController.update)
router.put('/complete', taskController.setComplete)

router.delete('/delete/:id', taskController.delete)
router.delete('/deleteFromPlaylist/:idplaylist', taskController.deleteFromPlaylist)

router.get('/getByDate/:iduser/:date', taskController.getByDate)
router.get('/getDatesByPlaylist/:idplaylist', taskController.getDatesByPlaylist)
router.get('/getByDateAndPlaylist/:idplaylist/:date', taskController.getByDateAndPlaylist)
router.get('/getCompleted/:iduser/:period', taskController.getCompleted)
router.get('/getFailed/:iduser/:period', taskController.getFailed)
router.get('/getPlaned/:iduser/:period', taskController.getPlaned)
router.get('/getDaysScheduled/:iduser/:period', taskController.getDaysScheduled)
router.get('/getStats/:iduser/:period', taskController.getStats)

module.exports = router;