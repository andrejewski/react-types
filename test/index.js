
var assert = require('assert');
var React = require('react');
var PropTypes = React.PropTypes;
var types = require('..');

describe('React Types', function() {

  it('should use React.PropType validators', function() {
    var regular = {
      'any': PropTypes.any.isRequired,
      'array': PropTypes.array.isRequired,
      'string': PropTypes.string.isRequired,
      'number': PropTypes.number.isRequired,
      'object': PropTypes.object.isRequired,
      'boolean': PropTypes.bool.isRequired,
      'function': PropTypes.func.isRequired,
      'node': PropTypes.node.isRequired,
      'element': PropTypes.element.isRequired
    };
    var typed = types({
      'any': 'Any',
      'array': Array,
      'string': String,
      'number': Number,
      'object': Object,
      'boolean': Boolean,
      'function': Function,
      'node': 'Node',
      'element': 'Element'
    });
    Object.keys(regular).map(function(key) {
      assert.strictEqual(typed[key], regular[key]);
    });
  });

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

