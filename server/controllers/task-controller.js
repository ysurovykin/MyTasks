const taskService = require('../services/task-service');

class TaskController {

    async create(req, res, next) {
        try {
            const { description, task_date, importance, playlist, iduser } = req.body;
            const response = await taskService.create(description, task_date, importance, playlist, iduser)
            res.json(response);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { description, task_date, importance, id } = req.body;
            const taskData = await taskService.update(description, task_date, importance, id);
            return res.json(taskData);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const taskData = await taskService.delete(id);
            return res.json(taskData);
        } catch (error) {
            next(error);
        }
    }
    async deleteFromPlaylist(req, res, next) {
        try {
            const { idplaylist } = req.params;
            console.log(idplaylist);
            const taskData = await taskService.deleteFromPlaylist(idplaylist);
            return res.json(taskData);
        } catch (error) {
            next(error);
        }
    }

    async getDatesByPlaylist(req, res, next) {
        try {
            const { idplaylist } = req.params;
            const tasks = await taskService.getDatesByPlaylist(idplaylist);
            return res.json(tasks);
        } catch (error) {
            next(error);
        }
    }
    
    async getByDateAndPlaylist(req, res, next) {
        try {
            const { idplaylist, date } = req.params;
            const tasks = await taskService.getByDateAndPlaylist(idplaylist, date);
            return res.json(tasks);
        } catch (error) {
            next(error);
        }
    }
    async getByDate(req, res, next) {
        try {
            const { iduser, date } = req.params;
            const task = await taskService.getByDate(iduser, date);
            return res.json(task);
        } catch (error) {
            next(error);
        }
    }
    async getCompleted(req, res, next) {
        try {
            const { iduser, period } = req.params;
            const task = await taskService.getCompleted(iduser, period);
            return res.json(task);
        } catch (error) {
            next(error);
        }
    }
    async getFailed(req, res, next) {
        try {
            const { iduser, period } = req.params;
            const task = await taskService.getFailed(iduser, period);
            return res.json(task);
        } catch (error) {
            next(error);
        }
    }
    async getPlaned(req, res, next) {
        try {
            const { iduser, period } = req.params;
            const task = await taskService.getPlaned(iduser, period);
            return res.json(task);
        } catch (error) {
            next(error);
        }
    }
    async getDaysScheduled(req, res, next) {
        try {
            const { iduser, period } = req.params;
            const task = await taskService.getDaysScheduled(iduser, period);
            return res.json(task);
        } catch (error) {
            next(error);
        }
    }
    async getStats(req, res, next) {
        try {
            const { iduser, period } = req.params;
            const task = await taskService.getStats(iduser, period);
            return res.json(task);
        } catch (error) {
            next(error);
        }
    }
    async setComplete(req, res, next) {
        try {
            const { id } = req.body;
            console.log('id: ' + id)
            const task = await taskService.setComplete(id);
            return res.json(task);
        } catch (error) {
            next(error);
        }
    }
    
}

module.exports = new TaskController();