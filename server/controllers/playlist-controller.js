const db = require('../db');
const playlistService = require('../services/playlist-sevices');

class PlaylistController {

    async create(req, res) {
        try {
            const { name, image, iduser } = req.body;
            const response = await playlistService.create(name, image, iduser)
            res.json(response);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { name, image, id } = req.body;
            const playlistData = await playlistService.update(name, image, id);
            return res.json(playlistData);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const playlistData = await playlistService.delete(id);
            return res.json(playlistData);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const { iduser } = req.params;
            const playlists = await playlistService.getAll(iduser);
            return res.json(playlists);
        } catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const playlist = await playlistService.getById(id);
            return res.json(playlist);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new PlaylistController();