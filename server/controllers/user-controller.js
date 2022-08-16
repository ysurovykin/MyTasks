const db = require('../db');
const userService = require('../services/user-service');

class UserController{
    async registration(req, res){
        const {name, email, password} = req.body;
        const response = await userService.registration(email, password, name)
        res.cookie('refreshToken', response.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
        res.json(response);
    }

}

module.exports = new UserController();