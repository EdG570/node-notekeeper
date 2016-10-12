const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
const helpers = require('./helpers.js');

const argv = yargs.argv;
const command = argv._[0];
const title = argv.title;
const body = argv.body;

switch(command) {
  case 'add':
    helpers.printHeader('Adding note...');
    let newNote = notes.addNote(title, body);

    if (newNote) {
      console.log(`${newNote.title} was successfully saved`);
    }
    else {
      console.log(`Sorry, your note was not saved because that title already exists`);
    }
    break;
  case 'list':
    helpers.printHeader('Fetching notes...');
    const notEmpty = notes.fetchAllNotes();

    if (!notEmpty) {
      console.log('Sorry but no notes were found. Feel free to add a note with the \'add\' command');
    }
    break;
  case 'remove':
    helpers.printHeader('Removing note...');
    notes.deleteNote(title);
    break;
  case 'read':
    helpers.printHeader('Fetching note...');
    const targetNote = notes.fetchOneNote(title);

    if (!targetNote) {
      console.log(`${title} was not found`)
    }

    break;
  default:
    console.log("Sorry but that isn't a valid command");
}