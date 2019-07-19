const express = require('express');
const db = require('../data/db-config.js');
const Projects = require('./projects-model.js');
const Actions = require('../actions/actions-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.getProjects()
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to get users' });
      });
  });

router.post('/', async (req, res) => {
    const project = req.body;
  
    try {
      const response = await Projects.addProject(project);
      res.status(201).json(response);
    } catch (err) {
      res.status(500).json({ message: 'Failed to create new project' });
    }
  });

  router.post('/:id/actions', async (req, res) => {
    const action = req.body;
    const { id } = req.params;
  
    try {
      const response = await Actions.addAction(action, id);
      res.status(201).json(response);
    } catch (err) {
      res.status(500).json({ message: 'Failed to create new action' });
    }
  });

router.get('/:ids/projectActions', (req, res) => {
    const { ids } = req.params;
    Projects.getProjectByID(ids)
        .then(project => {
            const { id, description, name, completed } = project;
            if(completed===0){
                status = false
            }else{
                status = true
            }
            Actions.getActionsByID(ids)
                .then(actions => {
                    for(let i =0; i < actions.length;i++){
                        if(actions[i].completed === 0){
                            actions[i].completed = false;
                        }else{
                            actions[i].completed = true;
                        }
                    }
                    const projectObject = {
                        id: id, 
                        description: description, 
                        name: name, 
                        completed: status, 
                        actions: actions
                    }
                    res.status(200).json(projectObject);
                })
                .catch(() => {
                    res.status(500).json({ message: 'Failed to get project actions' });
                  });
        })
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    try {
      const project = await Projects.getProjectByID(id);
  
      if (project) {
        const updated = await Projects.updateProject(changes, id);
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: 'Could not find project with given id' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Failed to update project' });
    }
  });

  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleted = await Projects.deleteProject(id);
  
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find project with given id' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete project' });
    }
  });
module.exports = router;