
var assert = require('assert');
var React = require('react');
var PropTypes = React.PropTypes;
var rTypes = require('..');

var types = rTypes(React);

describe('React Types', function() {

  it('should convert strings to the correct propTypes', function() {
    var kinds = "any array string number object boolean function node element".split(" ");
    kinds.forEach(function(type) {
      var func = types({key: type}).key;
      assert.equal(typeof func, 'function');

      var func = types({key: {type: type}}).key;
      assert.equal(typeof func, 'function');
    });
  });

  it('should convert constructors to the correct propTypes', function() {
    var kinds = [Array, String, Number, Object, Boolean, Function];
    kinds.forEach(function(type) {
      var func = types({key: type}).key;
      assert.equal(typeof func, 'function');

      var func = types({key: {type: type}}).key;
      assert.equal(typeof func, 'function');
    });
  });

  describe('raw(propType)', function() {
    it('should be an identity function for any given propType', function() {
      function a() {}
      var b = types({key: types.raw(a)}).key;
      assert.strictEqual(a, b);
    });
  });

});

