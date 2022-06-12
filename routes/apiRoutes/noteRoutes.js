const { isNote, createNewNote, validateNote, deleteNote } = require('../../lib/notes');
const { notes } = require('../../db/notes');

const router = require('express').Router();

// note api routes
router.get('/notes', (req, res) => {
  let results = notes;
  // if (req.query){
  //   results = filterByQuery(req.query, results);
  // }
  res.json(results);
});

router.get('/notes/:id', (req, res) => {
  const result = isNote(req.params.id, notes);
  if(result){
    res.json(result);
  } else {
    req.setEncoding(404);
  }
});

router.post('/notes', (req, res) => {
  // set an id based on what the next index of the array will be
    req.body.id = notes.length.toString();
  // validate note
  if(!validateNote(req.body)){
    // console.log('not validating properly');
    res.status(400).send('The note is not properly formatted');
  } else {
    // add note to json file and notes array
    const note = createNewNote(req.body, notes);
    res.json(req.body);
  }
});

router.delete('/notes/:id', (req, res) => {
  console.log('===================');
  console.log('-->router.delete');
  // make sure target note exists
  if(isNote(req.params.id, notes)){
    // delete it
    // const note = deleteNote(req.params.id.replace(':',''), notes)
    const note = deleteNote(req.params.id, notes)
  } else {
    let err = '404: did not find the target w id = '+req.params.id;
    console.log(err);
    return err;
  }
  console.log('<-- router.delete returning value(note):',notes)
  //  delete a note from the json file and teh notes array
  res.json(notes);
});

module.exports = router;