var slice = [].slice;

function AOPHelper(selector, answers) {
  this.answers = answers;
  if (typeof selector === 'string') selector = selector.split(/\s*,\s*/);
  this.selector = selector;
  this.action = undefined;
}
var p = AOPHelper.prototype;
// action list
['method', 'filter', 'on'].forEach(function (key) {
  p[key] = function () {
    var _key = '_' + key;
    if (p[_key] && p[_key].apply(this, arguments)) {
      // if arguments error, clean up the action
      this.action = undefined;
      return this;
    }
    this.action = {
      name: key,
      args: slice.call(arguments, 0)
    };
    return this;
  };
});

// the position of advice
['before', 'after'].forEach(function (key) {
  p[key] = function (advice) {
    if (!this.action) {
      console.error('Couldn\'t bind action');
      return this;
    }
    var self = this;
    this.selector.forEach(function (selector) {
      self.answers.push({
        selector: selector,
        action: self.action,
        way: key,
        advice: advice
      });
    });

    return this;
  };
});


module.exports = AOPHelper;