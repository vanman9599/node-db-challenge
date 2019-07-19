const db = require('../data/db-config.js');
module.exports = {
    getProjectByID, 
    addProject
    
}

function getProjectByID(id){
    return db('projects')
    .where({ id })
    .first();
}
function addProject(project){
    return db('projects')
    .insert(project)
    .then(sch => {
        if(sch){
            return sch;
        }else{
            return null;
        }
    })
}

function update(changes, id){
    return db('schemes')
    .where({ id })
    .update(changes)
    .then(scheme => {
        if(scheme){
            return scheme;
        }else{
            return null;
        }
    })
}
