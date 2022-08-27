const playlistService = require('../services/playlist-service');

class PlaylistController {

    async create(req, res, next) {
        try {
            const { name, background, image, iduser } = req.body;
            const response = await playlistService.create(name, background, image, iduser)
            res.json(response);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { name, background, image, id } = req.body;
            const playlistData = await playlistService.update(name, background, image, id);
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
    
    async uploadImage(req, res, next) {
        try {
            const { filename } = req.file;
            const { idplaylist } = req.params;
            const playlist = await playlistService.uploadImage(filename, idplaylist);
            return res.json(playlist);
        } catch (error) {
            next(error);
        }
    }
    //ToDo fix it
    async getPlaylistImage(req, res, next) {
        try {
            const { id } = req.params;
            const image = await playlistService.getPlaylistImage(id);
            return res.json(image);
        } catch (error) {
            next(error);
        }
    }
    
}

module.exports = new PlaylistController();