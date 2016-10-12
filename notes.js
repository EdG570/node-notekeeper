const fs = require('fs');
const helpers = require('./helpers.js');

const fetchFile = () => {
  try {
    return JSON.parse(fs.readFileSync('notes.json'));
  } catch(e) {
    return [];
  }
}

const saveFile = (note) => {
  fs.writeFileSync('notes.json', JSON.stringify(note));
}

const addNote = (title, body) => {
  let notes = [];
  let date = helpers.getFormattedDate();
  let newNote = {
    title,
    body,
    createdAt: date,
    updatedAt: date
  };

  notes = fetchFile();

  if (notes.length > 0) {
    let target = notes.filter(note => note.title === title);

    if (target.length === 0) {
      notes.push(newNote);
      saveFile(notes);
      return newNote;
    }
  } else {
    notes.push(newNote);
    saveFile(notes);
    return newNote;
  }
}

const fetchAllNotes = () => {
  const notes = fetchFile();

  if (notes.length > 0) {
    notes.forEach((note) => {
      helpers.printNote(note);
      console.log('---');
    });

    return true;
  }

  return false;
}

const fetchOneNote = (title) => {
  const notes = fetchFile();
  const targetNote = notes.filter(note => note.title === title);

  if (targetNote.length === 0) {
    return false;
  } else if (targetNote.length === 1) {
    helpers.printNote(targetNote[0]);
    return targetNote[0];
  }
}

module.exports = {
  addNote,
  fetchAllNotes,
  fetchOneNote
};

