const { filterByQuery, findById, createNewNote, validatenote } = require('../../lib/notes');
const { notes } = require('../../db/notes');

const router = require('express').Router();

// note api routes
router.get('/notes', (req, res) => {
  let results = notes;
  // if (req.query){
  //   results = filterByQuery(req.query, results);
  // }
  console.log(results);
  res.json(results);
});

router.get('/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if(result){
    res.json(result);
  } else {
    req.setEncoding(404);
  }
});

router.post('/notes', (req, res) => {
  // set an id based on what the next index of the array will be
  req.body.id = notes.length.toString();

  // validate animal
  if(!validateAnimal(req.body)){
    res.status(400).send('The animal is not properly formatted');
  } else {
    // add animal to json file and notes array
    const animal = createNewAnimal(req.body, aninotesmals);
    res.json(req.body);
  }

});

module.exports = router;