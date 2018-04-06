const express = require('express');

const router = express.Router();

const actionModel = require('../data/helpers/actionModel.js');

router.get('/', (req, res) => {
  actionModel
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json(`There was an error getting that action: ${error}`);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  actionModel
    .get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      res.status(500).json(`There was an error GETting that action: ${error}`);
    });
});

router.post('/', (req, res) => {
  actionModel
    .insert(req.body)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res
        .status(500)
        .json(`There was an error posting content to database: ${error}`);
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;
  actionModel
    .update(id, update)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  actionModel
    .get(id)
    .then(response => {
      action = { ...response[0] };
      actionModel
        .remove(id)
        .then(response => {
          res.status(200).json(action);
        })
        .catch(error => {
          res.status(500).json(error);
        });
    })
    .catch(error => {
      res.status(404).json(`Action not found: ${error}`);
    });
});

module.exports = router;
