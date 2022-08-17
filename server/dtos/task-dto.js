module.exports = class TaskDto{
    id;
    iduser;
    idplaylist;
    description;
    task_date;
    iscomplete;
    importance;
 
    constructor(model){
        this.id = model.id;
        this.iduser = model.iduser;
        this.idplaylist = model.idplaylist;
        this.description = model.description;
        this.task_date = model.task_date;
        this.iscomplete = model.iscomplete;
        this.importance = model.importance;
    }
}