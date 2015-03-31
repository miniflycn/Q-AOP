var AOPHelper = require('./helper');

function AOPFactory() {
  var answers = this.answers = [];
  this.helper = function (selector) {
    return new AOPHelper(selector, answers);
  }
}
var p = AOPFactory.prototype;
p.explain = function () {
  return this.answers;
};

module.exports = AOPFactory;