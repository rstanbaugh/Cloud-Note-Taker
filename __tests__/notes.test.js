const fs = require("fs");
const {
  isNote,
  createNewNote,
  validateNote,
  deleteNote
} = require("../lib/notes.js");
const { notes } = require('../db/notes');
const { JestHook } = require("jest-watcher");

// do not want to write to the JSON file
jest.mock('fs');

test("creates a note object", () => {
  const startingNotes = [];
  const newNote =     {
    "title": "mary",
    "text": "had a little lamb",
    "id": "2"
  };
  const noteListItems = createNewNote(newNote,startingNotes);

  expect(startingNotes[0].title).toBe("mary");
  expect(startingNotes[0].text).toBe("had a little lamb");
  expect(startingNotes[0].id).toBe("2");
});


test("validates if note is valid using id", () => {
  const startingNotes = [
    {
      "title": "twas brillig in the slithy t",
      "text": "all mismy were the borogroves",
      "id": "1"
    },
    {
      "title": "mary",
      "text": "had a little lamb",
      "id": "2"
    }
  ];

  const result = isNote("2", startingNotes);

  expect(result).toBe(true);
});

test("validates if note is deleted", () =>{
  const startingNotes = [
    {
      "title": "twas brillig in the slithy t",
      "text": "all mismy were the borogroves",
      "id": "1"
    },
    {
      "title": "mary",
      "text": "had a little lamb",
      "id": "2"
    }
  ];

  const deletedNotes = deleteNote("2",startingNotes)

  expect(deletedNotes.length).toEqual(1);
});
