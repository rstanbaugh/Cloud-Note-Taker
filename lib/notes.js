const { Console } = require('console');
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
    // console.log('--> deleteNote()');
    // delete it
    notesArray = notesArray.filter(note => note.id !== id);

    // re-write the json
    fs.writeFileSync(
      path.join(__dirname, '../db/notes.json'),
      JSON.stringify({notes: notesArray}, null, 2)
    );

    return notesArray;

};


function isNote(id, notesArray){
  // returns true if note is found
  // 
  // console.log('-->  start of isNote()()');
  // console.log('looking for note with id: ',id);
  const index = notesArray.findIndex(object => {
    return object.id === id;
  });
  if(index !== -1){
    return true;
  } else
  return false;
}

module.exports = {
  isNote,
  createNewNote,
  validateNote,
  deleteNote
}