
function typePropMap(React) {
  return {
    'any':      React.PropTypes.any,
    'array':    React.PropTypes.array,
    'string':   React.PropTypes.string,
    'number':   React.PropTypes.number,
    'object':   React.PropTypes.array,
    'boolean':  React.PropTypes.bool,
    'function': React.PropTypes.func,

    'node':     React.PropTypes.node,
    'element':  React.PropTypes.element
  };
}

function getFunctionName(fn) {
  if (fn.name) return fn.name;
  return (fn.toString().trim().match(/^function\s*([^\s(]+)/) || [])[1];
}

function Instance(prop) {
  return {
    type: 'instance',
    prop: prop
  };
}

function Enum(props) {
  return {
    type: 'enum',
    props: props
  };
}

function Union(props) {
  return {
    type: 'union',
    props: props
  };
}

function Shape(props) {
  return {
    type: 'shape',
    props: props
  };
}

function raw(propType) {
  return {
    type: 'raw',
    propType: propType
  };
}

function optional(prop) {
  prop.required = false;
  return prop;
}

module.exports = function ReactTypes(React, options) {
  options = options || {};
  options.required = options.required || true;

  var nameTypeMap = typePropMap(React);

  function getPropType(type) {
    function map(key) {
      return nameTypeMap[key];
    }

    if(typeof type === 'string') return map(type.toLowerCase());
    if(Array.isArray(type)) {
      if(type[0]) {
        return React.PropTypes.arrayOf(parseProp(type[0]));
      }
      return map('array');
    }
    return map(getFunctionName(type.constructor).toLowerCase());
  }

  function parseProp(prop) {
    var type = prop;
    if(prop.type) type = prop.type;

    var required = options.required;
    if(typeof prop.required === 'boolean') {
      required = prop.required;
    }

    var func = null;
    if(type === 'raw') {
      return prop.propType;
    } else if(type === 'enum') {
      func = React.PropTypes.oneOf(prop.values);
    } else if(type === 'union') {
      var types = prop.props.map(parseProp);
      func = React.PropTypes.oneOfType(types);
    } else if(type === 'shape') {
      func = React.PropTypes.shape(mapper(prop.props));
    } else if(type === 'instance') {
      func = React.PropTypes.instanceOf(prop.prop);
    } else {
      func = getPropType(type); 
    }

    if(required) return func.isRequired;
    return func;
  }

  function mapper(props) {
    var result = {};
    for(var key in props) {
      if(props.hasOwnProperty(key)) {
        result[key] = parseProp(props[key]);
      }
    }
    return result;
  }

  mapper.Instance = Instance;
  mapper.Enum = Enum;
  mapper.Union = Union;
  mapper.Shape = Shape;
  mapper.optional = optional;
  mapper.raw = raw;
  return mapper;
}

