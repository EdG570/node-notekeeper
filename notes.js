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

const deleteNote = (title) => {
  const notes = fetchFile();
  const newArr = notes.filter(note => note.title !== title);
  saveFile(newArr);
  helpers.printAllNotes(newArr);
  return newArr;
}

const updateNote = (title, newTitle, newBody) => {
  let newObj = {};
  let notes = fetchFile();
  let updatedNote;
  let targetNote = notes.filter(note => note.title === title);

  if (targetNote.length === 1) {
    targetNote = targetNote[0];
  } else if (targetNote.length === 0) {
    return false;
  }

  if (newTitle) newObj.title = newTitle;
  if (newBody) newObj.body = newBody;
  newObj.updatedAt = helpers.getFormattedDate();

  updatedNote = Object.assign({}, targetNote, newObj);

  notes = notes.filter(note => note.title !== title);
  notes.push(updatedNote);

  saveFile(notes);
  helpers.printNote(updatedNote);

  return updatedNote;
};

const lastEdit = (title) => {
  const notes = fetchFile();
  let target = notes.filter(note => note.title === title);
  let created = target[0].createdAt;
  target = target[0].updatedAt;

  if (target === created) {
    console.log(`No changes have been made to ${title} since its creation: ${created}`);
  } else {
    console.log(`${title} was created on ${created}`);
    console.log(`${title} was last changed on ${target}`);
  }
};

module.exports = {
  addNote,
  fetchAllNotes,
  fetchOneNote,
  deleteNote,
  updateNote,
  lastEdit
};

