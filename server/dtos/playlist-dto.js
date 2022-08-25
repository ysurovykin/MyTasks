module.exports = class PlaylistDto{
    id;
    iduser;
    name;
    image;
    background;
 
    constructor(model){
        this.id = model.id;
        this.iduser = model.iduser;
        this.name = model.name;
        this.image = model.image;
        this.background = model.background;
    }
}