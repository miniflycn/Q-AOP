var SandboxedModule = require('sandboxed-module')
  , AOPFactory = require('./lib/factory');

function analyse(path, opts) {
  opts = opts || {};

  var AOP = new AOPFactory();
  SandboxedModule.require(path, {
    globals: { 
      AOP: AOP.helper
    }
  });
  if (opts.handles) AOP.setHandles(opts.handles);
  return AOP.explain();
}

module.exports = {
  analyse: analyse
};