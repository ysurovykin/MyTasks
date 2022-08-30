const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../errors/api-errors');
const db = require('../db')

class UserService {
    async registration(email, password, name) {
        const pretender = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (pretender.rowCount) {
            throw ApiError.BadRequestError('This email is already exist');
        }
        const hashedPassword = await bcrypt.hash(password, 3);

        const newUser = await db.query('INSERT INTO users (email, password, name, theme) values ($1, $2, $3, $4) RETURNING *', [email, hashedPassword, name, 'light']);

        const userDto = new UserDto(newUser.rows[0]);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }
    async login(email, password) {
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (!user.rowCount) {
            throw ApiError.BadRequestError('No users with this email');
        }
        const isCorrectPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!isCorrectPassword) {
            throw ApiError.BadRequestError('Incorrect password');
        }
        const userDto = new UserDto(user.rows[0]);
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken);

        const currentToken = await tokenService.findToken(refreshToken);
        if (!userData || !currentToken) {
            throw ApiError.UnauthorizedError()
        }
        const user = await db.query('SELECT * FROM users WHERE id = $1', [userData.id]);

        const userDto = new UserDto(user.rows[0]);
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }
    async changeTheme(id) {
        const userData = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        if (!userData.rowCount) {
            throw ApiError.BadRequestError('User is not exist');
        }
        if (userData.rows[0].theme === 'light') {
            const newUserData = await db.query('UPDATE users SET theme = $1 WHERE id = $2 RETURNING *', ['dark', userData.rows[0].id]);
            const userDto = new UserDto(newUserData.rows[0]);
            return userDto;
        }
        else {
            const newUserData = await db.query('UPDATE users SET theme = $1 WHERE id = $2 RETURNING *', ['light', userData.rows[0].id]);
            const userDto = new UserDto(newUserData.rows[0]);
            return userDto;
        }
    }
}

module.exports = new UserService();