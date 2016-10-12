var helpers = require('../helpers.js');
var expect = require('chai').expect;

describe('helpers', () => {
  it('should return month based on index', () => {
    const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    expect(helpers.convertMonth(months[0])).to.equal('Jan');
    expect(helpers.convertMonth(months[1])).to.equal('Feb');
    expect(helpers.convertMonth(months[5])).to.equal('Jun');
    expect(helpers.convertMonth(months[3])).to.equal('Apr');
    expect(helpers.convertMonth(months[11])).to.equal('Dec');
    expect(helpers.convertMonth(months[12])).to.equal(undefined);
  });
});