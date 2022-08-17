const jwt = require('jsonwebtoken')
const db = require('../db')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await db.query('SELECT * FROM tokens WHERE idUser = $1', [userId]);
        if (tokenData.rowCount) {
            const token = await db.query('UPDATE tokens SET refreshtoken = $1 WHERE iduser = $2 RETURNING *', [refreshToken, userId]);
            return token;
        }
        const token = await db.query('INSERT INTO tokens (iduser, refreshtoken) values ($1, $2) RETURNING *', [userId, refreshToken]);
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await db.query('DELETE FROM tokens WHERE refreshtoken = $1', [refreshToken]);
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await db.query('SELECT * FROM tokens WHERE refreshtoken = $1', [refreshToken]);
        return tokenData;
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }


}

module.exports = new TokenService();