const TaskDto = require('../dtos/task-dto');
const ApiError = require('../errors/api-errors');
const db = require('../db')

class TaskService {
    async create(description, task_date, importance, playlist, iduser) {
        const existedTask = await db.query('SELECT * FROM tasks WHERE description = $1 and task_date = $2 ', [description, task_date]);
        if (existedTask.rowCount) {
            throw ApiError.BadRequestError('Such task at this date already exist');
        }
        const existedPlaylist = await db.query('SELECT * FROM playlists WHERE name = $1', [playlist]);
        if (!existedPlaylist.rowCount) {
            throw ApiError.BadRequestError('Playlist is not exist');
        }
        const newTask = await db.query('INSERT INTO tasks (description, task_date, importance, iscomplete, iduser, idplaylist) values ($1, $2, $3, $4, $5, $6) RETURNING *',
            [description, task_date, importance, false, iduser, existedPlaylist.rows[0].id]);
        const taskDto = new TaskDto(newTask.rows[0]);
        return taskDto;
    }
    async update(description, task_date, importance, id) {
        const task = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
        if (!task.rowCount) {
            throw ApiError.BadRequestError('Task is not exist');
        }
        const updatedTask = await db.query('UPDATE tasks SET description = $1, task_date = $2, importance = $3 WHERE id = $4 RETURNING *',
            [description, task_date, importance, id]);
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
    async deleteFromPlaylist(idplaylist) {
        const today = new Date();
        const deletedPlaylistPlannedTasks = await db.query('DELETE FROM tasks WHERE idplaylist = $1 AND task_date > $2 RETURNING *', [idplaylist, today]);
        return deletedPlaylistPlannedTasks.rows;
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
    async getByDate(iduser, date) {
        const task = await db.query('SELECT * FROM tasks WHERE task_date = $1 AND iduser = $2', [date, iduser]);
        return task.rows
    }
    async setComplete(id) {
        const task = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
        const hour = new Date().getHours();
        if (!task.rowCount) {
            throw ApiError.BadRequestError('Task is not exist');
        }
        if (task.rows[0].iscomplete) {
            const updatedTask = await db.query('UPDATE tasks SET iscomplete = $1, complete_hour = $2 WHERE id = $3 RETURNING *',
                [false, null, id]);
            const taskDto = new TaskDto(updatedTask.rows[0]);
            return taskDto
        }
        else {
            const updatedTask = await db.query('UPDATE tasks SET iscomplete = $1, complete_hour = $2 WHERE id = $3 RETURNING *',
                [true, hour, id]);
            const taskDto = new TaskDto(updatedTask.rows[0]);
            return taskDto
        }
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
    async getStats(iduser, period) {
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        const today = currentYear + '.' + currentMonth + '.' + currentDay;

        switch (period) {
            case 'month':
                const startMonth = currentYear + '.' + currentMonth + '.01';
                const endMonth = currentYear + '.' + currentMonth + '.31';
                const allCompletedM = await db.query('SELECT * FROM tasks WHERE iduser = $1 and task_date >= $2 and task_date <= $3 and iscomplete = true', [iduser, startMonth, endMonth]);
                const comlete0To6M = await db.query('SELECT * FROM tasks WHERE iduser = $1 and task_date >= $2 and task_date <= $3 and complete_hour between 0 and 5', [iduser, startMonth, endMonth]);
                const comlete6To9M = await db.query('SELECT * FROM tasks WHERE iduser = $1 and task_date >= $2 and task_date <= $3 and complete_hour between 6 and 8', [iduser, startMonth, endMonth]);
                const comlete9To12M = await db.query('SELECT * FROM tasks WHERE iduser = $1 and task_date >= $2 and task_date <= $3 and complete_hour between 9 and 11', [iduser, startMonth, endMonth]);
                const comlete12To15M = await db.query('SELECT * FROM tasks WHERE iduser = $1 and task_date >= $2 and task_date <= $3 and complete_hour between 12 and 14', [iduser, startMonth, endMonth]);
                const comlete15To18M = await db.query('SELECT * FROM tasks WHERE iduser = $1 and task_date >= $2 and task_date <= $3 and complete_hour between 15 and 17', [iduser, startMonth, endMonth]);
                const comlete18To21M = await db.query('SELECT * FROM tasks WHERE iduser = $1 and task_date >= $2 and task_date <= $3 and complete_hour between 18 and 20', [iduser, startMonth, endMonth]);
                const comlete21To0M = await db.query('SELECT * FROM tasks WHERE iduser = $1 and task_date >= $2 and task_date <= $3 and complete_hour between 21 and 23', [iduser, startMonth, endMonth]);
                return [comlete0To6M.rowCount / allCompletedM.rowCount * 100,
                comlete6To9M.rowCount / allCompletedM.rowCount * 100,
                comlete9To12M.rowCount / allCompletedM.rowCount * 100,
                comlete12To15M.rowCount / allCompletedM.rowCount * 100,
                comlete15To18M.rowCount / allCompletedM.rowCount * 100,
                comlete18To21M.rowCount / allCompletedM.rowCount * 100,
                comlete21To0M.rowCount / allCompletedM.rowCount * 100]
            case 'year':
                const startYear = currentYear + '.01.01';
                const endYear = currentYear + '.12.31';
                const allCompletedY = await db.query('SELECT * FROM tasks WHERE iduser = $1 and task_date >= $2 and task_date <= $3 and iscomplete = true', [iduser, startYear, endYear]);
                const comlete0To6Y = await db.query('SELECT * FROM tasks WHERE iduser = $1 and task_date >= $2 and task_date <= $3 and complete_hour between 0 and 5', [iduser, startYear, endYear]);
                const comlete6To9Y = await db.query('SELECT * FROM tasks WHERE iduser = $1 and task_date >= $2 and task_date <= $3 and complete_hour between 6 and 8', [iduser, startYear, endYear]);
                const comlete9To12Y = await db.query('SELECT * FROM tasks WHERE iduser = $1 and task_date >= $2 and task_date <= $3 and complete_hour between 9 and 11', [iduser, startYear, endYear]);
                const comlete12To15Y = await db.query('SELECT * FROM tasks WHERE iduser = $1 and task_date >= $2 and task_date <= $3 and complete_hour between 12 and 14', [iduser, startYear, endYear]);
                const comlete15To18Y = await db.query('SELECT * FROM tasks WHERE iduser = $1 and task_date >= $2 and task_date <= $3 and complete_hour between 15 and 17', [iduser, startYear, endYear]);
                const comlete18To21Y = await db.query('SELECT * FROM tasks WHERE iduser = $1 and task_date >= $2 and task_date <= $3 and complete_hour between 18 and 20', [iduser, startYear, endYear]);
                const comlete21To0Y = await db.query('SELECT * FROM tasks WHERE iduser = $1 and task_date >= $2 and task_date <= $3 and complete_hour between 21 and 23', [iduser, startYear, endYear]);
                return [comlete0To6Y.rowCount / allCompletedY.rowCount * 100,
                comlete6To9Y.rowCount / allCompletedY.rowCount * 100,
                comlete9To12Y.rowCount / allCompletedY.rowCount * 100,
                comlete12To15Y.rowCount / allCompletedY.rowCount * 100,
                comlete15To18Y.rowCount / allCompletedY.rowCount * 100,
                comlete18To21Y.rowCount / allCompletedY.rowCount * 100,
                comlete21To0Y.rowCount / allCompletedY.rowCount * 100]
            case 'all':
                const allCompletedA = await db.query('SELECT * FROM tasks WHERE iduser = $1 and iscomplete = true', [iduser]);
                const comlete0To6A = await db.query('SELECT * FROM tasks WHERE iduser = $1 and complete_hour between 0 and 5', [iduser]);
                const comlete6To9A = await db.query('SELECT * FROM tasks WHERE iduser = $1 and complete_hour between 6 and 8', [iduser]);
                const comlete9To12A = await db.query('SELECT * FROM tasks WHERE iduser = $1 and complete_hour between 9 and 11', [iduser]);
                const comlete12To15A = await db.query('SELECT * FROM tasks WHERE iduser = $1 and complete_hour between 12 and 14', [iduser]);
                const comlete15To18A = await db.query('SELECT * FROM tasks WHERE iduser = $1 and complete_hour between 15 and 17', [iduser]);
                const comlete18To21A = await db.query('SELECT * FROM tasks WHERE iduser = $1 and complete_hour between 18 and 20', [iduser]);
                const comlete21To0A = await db.query('SELECT * FROM tasks WHERE iduser = $1 and complete_hour between 21 and 23', [iduser]);
                return [comlete0To6A.rowCount / allCompletedA.rowCount * 100,
                comlete6To9A.rowCount / allCompletedA.rowCount * 100,
                comlete9To12A.rowCount / allCompletedA.rowCount * 100,
                comlete12To15A.rowCount / allCompletedA.rowCount * 100,
                comlete15To18A.rowCount / allCompletedA.rowCount * 100,
                comlete18To21A.rowCount / allCompletedA.rowCount * 100,
                comlete21To0A.rowCount / allCompletedA.rowCount * 100]

        }
    }
}

module.exports = new TaskService();