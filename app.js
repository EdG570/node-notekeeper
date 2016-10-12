const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
const command = argv._[0];
const title = argv.title;
const body = argv.body;

switch(command) {
  case 'add':
    console.log('Adding note');
    notes.addNote(title, body);
    break;
  case 'list':
    console.log('Listing notes');
    break;
  case 'remove':
    console.log('Removing note');
    break;
  case 'read':
    console.log('Reading note');
    break;
  default:
    console.log("Sorry but that isn't a valid command");
}