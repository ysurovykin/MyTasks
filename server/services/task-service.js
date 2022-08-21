const TaskDto = require('../dtos/task-dto');
const ApiError = require('../errors/api-errors');
const db = require('../db')

class TaskService {
    async create(description, task_date, importance, playlist) {
        const existedTask = await db.query('SELECT * FROM tasks WHERE description = $1 and task_date = $2 ', [description, task_date]);
        if (existedTask.rowCount) {
            throw ApiError.BadRequestError('Such task at this date already exist');
        }
        const existedPlaylist = await db.query('SELECT * FROM playlists WHERE name = $1', [playlist]);
        if (!existedPlaylist.rowCount) {
            throw ApiError.BadRequestError('Playlist is not exist');
        }
        const newTask = await db.query('INSERT INTO tasks (description, task_date, importance, iscomplete, idplaylist) values ($1, $2, $3, $4, $5) RETURNING *',
            [description, task_date, importance, false, existedPlaylist.rows[0].id]);
        const taskDto = new TaskDto(newTask.rows[0]);
        return taskDto;
    }
    async update(description, task_date, importance, playlist, id) {
        const task = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
        if (!task.rowCount) {
            throw ApiError.BadRequestError('Task is not exist');
        }
        const existedPlaylist = await db.query('SELECT * FROM playlists WHERE name = $1', [playlist]);
        if (!existedPlaylist.rowCount) {
            throw ApiError.BadRequestError('Playlist is not exist');
        }
        const updatedTask = await db.query('UPDATE tasks SET description = $1, task_date = $2, importance = $3, idplaylist = $4 WHERE id = $5 RETURNING *',
            [description, task_date, importance, existedPlaylist.rows[0].id, id]);
        const taskDto = new TaskDto(updatedTask.rows[0]);

        return taskDto
    }
    async delete(id) {
        const task = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
        if (!task.rowCount) {
            throw ApiError.BadRequestError('Task is not exist');
        }
        const deletedTask = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
        const taskDto = new TaskDto(deletedTask.rows[0]);

        return taskDto
    }
    async getDatesByPlaylist(idplaylist) {
        const newDate = new Date().toISOString();
        const task_dates = await db.query('SELECT DISTINCT SUBSTRING(to_char(task_date, \'DD.MM.YYYY\')::text, 1, 10) as response FROM tasks WHERE idplaylist = $1 AND task_date >= $2 ORDER BY response ASC', [idplaylist, newDate.slice(0, 10)]);
        return task_dates.rows
    }
    async getByDateAndPlaylist(idplaylist, date) {
        const tasks = await db.query('SELECT * FROM tasks WHERE idplaylist = $1 AND task_date = $2', [idplaylist, date]);
        return tasks.rows
    }
    async getByDate(date) {
        const task = await db.query('SELECT * FROM tasks WHERE task_date = $1', [date]);
        return task.rows[0]
    }
    async setComplete(id) {
        const task = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
        if (!task.rowCount) {
            throw ApiError.BadRequestError('Task is not exist');
        }
        const updatedTask = await db.query('UPDATE tasks SET iscomplete = $1 WHERE id = $2 RETURNING *',
            [!(task.rows[0].iscomplete), id]);
        const taskDto = new TaskDto(updatedTask.rows[0]);

        return taskDto
    }
    async getCompleted(iduser, period) {
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        const today = currentYear + '.' + currentMonth + '.' + currentDay;

        switch (period) {
            case 'month':
                const startMonth = currentYear + '.' + currentMonth + '.01';
                const completedTasksM = await db.query('SELECT * FROM tasks WHERE iduser = $1 and task_date >= $2 and task_date < $3 and iscomplete = true', [iduser, startMonth, today]);
                return completedTasksM.rowCount
            case 'year':
                const startYear = currentYear + '.01.01';
                const completedTasksY = await db.query('SELECT * FROM tasks WHERE iduser = $1 and task_date >= $2 and task_date < $3 and iscomplete = true', [iduser, startYear, today]);
                return completedTasksY.rowCount
            case 'all':
                const completedTasksA = await db.query('SELECT * FROM tasks WHERE iduser = $1 and  task_date < $2 and iscomplete = true', [iduser, today]);
                return completedTasksA.rowCount
        }
    }
    async getFailed(iduser, period) {
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        const today = currentYear + '.' + currentMonth + '.' + currentDay;

        switch (period) {
            case 'month':
                const startMonth = currentYear + '.' + currentMonth + '.01';
                const completedTasksM = await db.query('SELECT * FROM tasks WHERE iduser = $1 and task_date >= $2 and task_date < $3 and iscomplete = false', [iduser, startMonth, today]);
                return completedTasksM.rowCount
            case 'year':
                const startYear = currentYear + '.01.01';
                const completedTasksY = await db.query('SELECT * FROM tasks WHERE iduser = $1 and task_date >= $2 and task_date < $3 and iscomplete = false', [iduser, startYear, today]);
                return completedTasksY.rowCount
            case 'all':
                const completedTasksA = await db.query('SELECT * FROM tasks WHERE iduser = $1 and  task_date < $2 and iscomplete = false', [iduser, today]);
                return completedTasksA.rowCount
        }
    }
    async getPlaned(iduser, period) {
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        const today = currentYear + '.' + currentMonth + '.' + currentDay;

        switch (period) {
            case 'month':
                const endMonth = currentYear + '.' + currentMonth + '.31';
                const completedTasksM = await db.query('SELECT * FROM tasks WHERE iduser = $1 and task_date > $2 and task_date <= $3', [iduser, today, endMonth]);
                return completedTasksM.rowCount
            case 'year':
                const endYear = currentYear + '.12.31';
                const completedTasksY = await db.query('SELECT * FROM tasks WHERE iduser = $1 and task_date > $2 and task_date <= $3', [iduser, today, endYear]);
                return completedTasksY.rowCount
            case 'all':
                const completedTasksA = await db.query('SELECT * FROM tasks WHERE iduser = $1 and  task_date > $2', [iduser, today]);
                return completedTasksA.rowCount
        }
    }
    async getDaysScheduled(iduser, period) {
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        const today = currentYear + '.' + currentMonth + '.' + currentDay;

        switch (period) {
            case 'month':
                const startMonth = currentYear + '.' + currentMonth + '.01';
                const endMonth = currentYear + '.' + currentMonth + '.31';
                const completedTasksM = await db.query('SELECT DISTINCT task_date FROM tasks WHERE iduser = $1 and task_date >= $2 and task_date <= $3', [iduser, startMonth, endMonth]);
                return completedTasksM.rowCount
            case 'year':
                const startYear = currentYear + '.01.01';
                const endYear = currentYear + '.12.31';
                const completedTasksY = await db.query('SELECT DISTINCT task_date FROM tasks WHERE iduser = $1 and task_date >= $2 and task_date <= $3', [iduser, startYear, endYear]);
                return completedTasksY.rowCount
            case 'all':
                const completedTasksA = await db.query('SELECT DISTINCT task_date FROM tasks WHERE iduser = $1', [iduser]);
                return completedTasksA.rowCount
        }
    }
}

module.exports = new TaskService();