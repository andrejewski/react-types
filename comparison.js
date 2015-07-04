
/*
  In the React documentation it is shown how to
  write PropTypes.

  Reference doc: 
  http://facebook.github.io/react/docs/reusable-components.html#prop-validation

  This script is a side-by-side comparison showing 
  how to write PropTypes using React Types.
*/

var React = require('react');
var types = require('react-types')(React);

var Message = null; // some unknown class

React.createClass({
  propTypes: {
    
    // React uses optional everywhere,
    // but React Types uses required.
    optionalArray: types.optional(Array),
    optionalBool: types.optional(Boolean),
    optionalFunc: types.optional(Function),
    optionalNumber: types.optional(Number),
    optionalObject: types.optional(Object),
    optionalString: types.optional(String),

    // These constructors may not exist in scope,
    // so the use of their string names is used here.
    optionalNode: types.optional('Node'),
    optionalElement: types.optional('Element'),

    optionalMessage: types.optional(types.Instance(Message)),

    // React went with 'oneOf' instead of 'enum' because of
    // a reserved word issue. But I like enum. 
    optionalEnum: types.optional(types.Enum(['News', 'Photos'])),
    
    optionalUnion: types.optional(types.Union([
      String,
      Number,
      types.Instance(Message)
    ])),

    optionalArrayOf: types.optional([Number]),

    // There isn't a shortcut here because the 
    // usefullness of this method is slim.
    optionalObjectOf: types.raw(React.PropTypes.objectOf(React.PropType.number)),

    optionalObjectOfShape: types.optional(types.Shape({
      color: String,
      fontSize: Number
    })),

    // Finally, no more dumb optional props
    requiredFunc: Function,
    requiredAny: 'Any',

    customProp: types.raw(function(props, propName, componentName) {
      if (!/matchme/.test(props[propName])) {
        return new Error('Validation failed!');
      }
    })

  }
});

