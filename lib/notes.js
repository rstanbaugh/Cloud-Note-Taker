const fs = require('fs');
const path = require('path');

// function to validate the notes fields
function validateNote(note){
  // console.log('note rx in validate',note);
  if(!note.title || typeof note.title !== 'string'){
    // console.log('note.title = ',note.title);
    // console.log('note.name fails validation. typeof: ',typeof note.name);
    return false;
  }
  if(!note.text || typeof note.text !== 'string'){
    // console.log('note.text = ',note.text);
    // console.log('note.text fails validation. typeof: ',typeof note.text);

    return false;
  }
  return true;
}

// function to create new notes from the POST listener
function  createNewNote(body, notesArray){
  const note = body;
 notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, '../db/notes.json'),
    JSON.stringify({notes: notesArray}, null, 2)
  );
  return body;
}

function deleteNote(id, notesArray){
  // check tht item exists
  const result = findById(id, notesArray);


  if(result){
    // delete it
    notesArray = notesArray.filter(note => note.id !== id);
    // re-write the json
    fs.writeFileSync(
      path.join(__dirname, '../db/notes.json'),
      JSON.stringify({notes: notesArray}, null, 2)
    );
    return result;

  } else {
    console.log('404: did not find the delete target');
  }
};


function findById(id, notesArray){
  console.log(id)
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
  createNewNote,
  validateNote,
  filterByQuery,
  deleteNote
}