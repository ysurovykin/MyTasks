const PlaylistDto = require('../dtos/playlist-dto');
const ApiError = require('../errors/api-errors');
const db = require('../db')

class PlaylistService {
    async create(name, background, image, iduser) {
        const existedPlaylist = await db.query('SELECT * FROM playlists WHERE name = $1', [name]);

        if (existedPlaylist.rowCount) {
            throw ApiError.BadRequestError('Playlist with this name already exist');
        }
        const newPlaylist = await db.query('INSERT INTO playlists (name, image, background, iduser) values ($1, $2, $3, $4) RETURNING *', [name, image, background, iduser]);
        const playlistDto = new PlaylistDto(newPlaylist.rows[0]);
        return playlistDto;
    }
    async update(name, background, image, id) {
        const playlist = await db.query('SELECT * FROM playlists WHERE id = $1', [id]);
        if (!playlist.rowCount) {
            throw ApiError.BadRequestError('Playlist is not exist');
        }
        const updatedPlaylist = await db.query('UPDATE playlists SET name = $1, image = $2, background = $3 WHERE id = $4 RETURNING *', [name, image, background, id]);
        const playlistDto = new PlaylistDto(updatedPlaylist.rows[0]);

        return playlistDto
    }
    async delete(id) {
        const playlist = await db.query('SELECT * FROM playlists WHERE id = $1', [id]);
        if (!playlist.rowCount) {
            throw ApiError.BadRequestError('Playlist is not exist');
        }
        const deletedPlaylist = await db.query('DELETE FROM playlists WHERE id = $1 RETURNING *', [id]);
        const playlistDto = new PlaylistDto(deletedPlaylist.rows[0]);

        return playlistDto
    }
    async getAll(iduser) {
        const playlists = await db.query('SELECT * FROM playlists WHERE iduser = $1 ORDER BY name ASC', [iduser]);
        return playlists.rows
    }
    async getById(id) {
        const playlist = await db.query('SELECT * FROM playlists WHERE id = $1', [id]);
        if (!playlist.rowCount) {
            throw ApiError.BadRequestError('Playlist is not exist');
        }

        const playlistDto = new PlaylistDto(playlist.rows[0]);

        return playlistDto
    }
}

module.exports = new PlaylistService();