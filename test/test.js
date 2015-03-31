var QAOP = require('../')

describe('analyse', function () {
  it('should get the answer', function () {
    var answer = QAOP.analyse('./test/aspect/case1');
    answer = answer[0];
    answer.selector.should.equal('#hello');
    answer.action.name.should.equal('method');
    answer.way.should.equal('before');
    answer.action.args.should.eql(['hello']);
  });
});