const express = require('express');
const db = require('../data/db-config.js');
const Projects = require('./projects-model.js');
const Actions = require('../actions/actions-model.js');

const router = express.Router();

router.post('/', async (req, res) => {
    const project = req.body;
  
    try {
      const response = await Projects.addProject(project);
      res.status(201).json(response);
    } catch (err) {
      res.status(500).json({ message: 'Failed to create new project' });
    }
  });

  router.post('/:id', async (req, res) => {
    const action = req.body;
    const { id } = req.params;
  
    try {
      const response = await Actions.addAction(action, id);
      res.status(201).json(response);
    } catch (err) {
      res.status(500).json({ message: 'Failed to create new project' });
    }
  });

router.get('/:ids/projectActions', (req, res) => {
    const { ids } = req.params;
    Projects.getProjectByID(ids)
        .then(project => {
            const { id, description, name, completed } = project;
            Actions.getActionsByID(ids)
                .then(actions => {
                    const projectObject = {
                        id: id, 
                        description: description, 
                        name: name, 
                        completed: completed, 
                        actions: actions
                    }
                    res.status(200).json(projectObject);
                })
        })
})
module.exports = router;