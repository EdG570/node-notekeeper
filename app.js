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
    console.log('Adding note...');
    console.log('---');
    let newNote = notes.addNote(title, body);

    if (newNote) {
      console.log(`${newNote.title} was successfully saved`);
    }
    else {
      console.log(`Sorry, your note was not saved because that title already exists`);
    }
    break;
  case 'list':
    console.log('Fetching notes...');
    console.log('---');
    const notEmpty = notes.fetchAllNotes();

    if (!notEmpty) {
      console.log('Sorry but no notes were found. Feel free to add a note with the \'add\' command');
    }
    break;
  case 'remove':
    console.log('Removing note');
    break;
  case 'read':
    console.log('Fetching note...');
    console.log('---');
    const targetNote = notes.fetchOneNote(title);

    if (!targetNote) {
      console.log(`${title} was not found`)
    }

    break;
  default:
    console.log("Sorry but that isn't a valid command");
}