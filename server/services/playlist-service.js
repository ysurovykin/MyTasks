const PlaylistDto = require('../dtos/playlist-dto');
const ApiError = require('../errors/api-errors');
const db = require('../db')
const fs = require('fs')
const path = require('path')

class PlaylistService {
    async create(name, background, iduser) {
        const existedPlaylist = await db.query('SELECT * FROM playlists WHERE name = $1', [name]);

        if (existedPlaylist.rowCount) {
            throw ApiError.BadRequestError('Playlist with this name already exist');
        }
        const newPlaylist = await db.query('INSERT INTO playlists (name, background, iduser) values ($1, $2, $3) RETURNING *', [name, background, iduser]);
        const playlistDto = new PlaylistDto(newPlaylist.rows[0]);
        console.log(playlistDto)
        return playlistDto;
    }
    async update(name, background, id) {
        const playlist = await db.query('SELECT * FROM playlists WHERE id = $1', [id]);
        if (!playlist.rowCount) {
            throw ApiError.BadRequestError('Playlist is not exist');
        }
        const updatedPlaylist = await db.query('UPDATE playlists SET name = $1, background = $2 WHERE id = $3 RETURNING *', [name, background, id]);
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
    async uploadImage(fileName, idplaylist) {

        const playlist = await db.query('SELECT * FROM playlists WHERE id = $1', [idplaylist]);
        if (!playlist.rowCount) {
            throw ApiError.BadRequestError('Playlist is not exist');
        }
        if (!!playlist.rows[0].image) {
            fs.unlink(`../client/public/albumImages/${playlist.rows[0].image}`, (err => {
                if (err) console.log(err);
            }));
        }
        const updatedPlaylist = await db.query('UPDATE playlists SET image = $1 WHERE id = $2 RETURNING *', [fileName, idplaylist]);
        const playlistDto = new PlaylistDto(updatedPlaylist.rows[0]);

        return playlistDto
    }

}

module.exports = new PlaylistService();