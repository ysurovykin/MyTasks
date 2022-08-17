const PlaylistDto = require('../dtos/playlist-dto');
const ApiError = require('../errors/api-errors');
const db = require('../db')

class PlaylistService {
    async create(name, image, iduser) {
        const existedPlaylist = await db.query('SELECT * FROM playlists WHERE name = $1', [name]);

        if (existedPlaylist.rowCount) {
            throw ApiError.BadRequestError('Playlist with this name already exist');
        }
        const newPlaylist = await db.query('INSERT INTO playlists (name, image, iduser) values ($1, $2, $3) RETURNING *', [name, image, iduser]);
        const playlistDto = new PlaylistDto(newPlaylist.rows[0]);
        return playlistDto;
    }
    async update(name, image, id) {
        const playlist = await db.query('SELECT * FROM playlists WHERE id = $1', [id]);
        if (!playlist.rowCount) {
            throw ApiError.BadRequestError('Playlist is not exist');
        }
        const updatedPlaylist = await db.query('UPDATE playlists SET name = $1, image = $2 WHERE id = $3 RETURNING *', [name, image, id]);
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
        const playlists = await db.query('SELECT * FROM playlists WHERE iduser = $1', [iduser]);
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