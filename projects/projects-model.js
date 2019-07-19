const db = require('../data/db-config.js');
module.exports = {
    getProjectByID, 
    addProject, 
    updateProject, 
    getProjects, 
    deleteProject
    
}
function getProjects(){
    return db('projects')
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

function updateProject(changes, id){
    return db('projects')
    .where({ id })
    .update(changes)
    .then(project => {
        if(project){
            return project;
        }else{
            return null;
        }
    })
}

function deleteProject(id){
    return db('projects')
    .where({ id })
    .del()
    .then(num => {
        if(num){
           return num;
        }else{
            return null;
        }
    })

    
}
