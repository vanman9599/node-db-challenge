const db = require('../data/db-config.js');
module.exports = {
    getActionsByID, 
    addAction
    
}

function getActionsByID(id){
    return db('actions')
    .where({ projectID: id })
    
}

function addAction(action, id){
    return db('actions')
    .where({ projectID: id})
    .insert(action)
    .then(response => {
        if(response){
            return response;
        }else{
            return null;
        }
    })
}