const fs = require('fs');
const path = require('path');

// function to validate the notes fields
function validateNote(note){
  console.log(annoteimal);
  if(!note.name || typeof note.name !== 'string'){
    return false;
  }
  if(!note.text || typeof note.text !== 'string'){
    return false;
  }
  return true;
}

// function to create new animals from teh POST listener
function  createNewnote(body, notesArray){
  const note = body;
 notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, '../data/notes.json'),
    JSON.stringify({notes: notesArray}, null, 2)
  );

  return body;
}


function findById(id, notesArray){
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
}

function filterByQuery(query, notes) {
  // let filteredResults = notes;


  // if (query.name) {
  //   filteredResults = filteredResults.filter(notes => notes.name === query.name);
  // }
  // return filteredResults;
  return notes;
}

module.exports = {
  findById,
  createNewnote,
  validateNote,
  filterByQuery
}