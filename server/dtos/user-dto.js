module.exports = class UserDto{
    id;
    email;
    name;
    theme;
 
    constructor(model){
        this.id = model.id;
        this.email = model.email;
        this.name = model.name;
        this.theme = model.theme
    }
}