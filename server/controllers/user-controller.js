const userService = require('../services/user-service');

class UserController {
    async registration(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const response = await userService.registration(email, password, name)
            res.cookie('refreshToken', response.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            res.json(response);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    }
    async changeTheme(req, res, next){
        try {
            const {id} = req.body;
            const user = await userService.changeTheme(id);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new UserController();