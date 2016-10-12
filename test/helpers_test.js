var helpers = require('../helpers.js');
var expect = require('chai').expect;

describe('helpers', () => {
  it('should return month based on index', () => {
    let month = 0;

    expect(helpers.convertMonth(month)).to.equal('Jan');
  });
});