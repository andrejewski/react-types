# React Types

I don't like React's PropTypes, but I do like prop validation. React Types replaces the verbosity of PropTypes with something more like how [Mongoose](https://github.com/Automattic/mongoose) does its [schema building](http://mongoosejs.com/docs/schematypes.html).

```bash
npm install react-types
```

## What does it do?

Instead of this:

```js
var MyComponent = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    isKewl: React.PropTypes.bool.isRequired,
    cats: React.PropTypes.arrayOf(React.PropsTypes.shape({
      name: React.PropTypes.string.isRequired,
      age: React.PropTypes.number.isRequired
    }))
  }
});
// holy crap, glad I don't ever have to write that again...
```

You can write this:

```js
var types = require('react-types');
var Shape = types.Shape;

MyComponent = React.createClass({
  propTypes: types({
    name: String,
    isKewl: Boolean,
    cats: [Shape({
      name: String,
      age: Number
    })]
  })
});
```

There is a more feature-packed [comparison](https://github.com/andrejewski/react-types/blob/master/comparison.js) available to see how everything stacks up against regular PropTypes.

But of course it's your choice which you would prefer to type.

## FAQ

### Prop types: optional versus required?

React makes all propTypes optional by default, which I think is a bad choice. Props are going to be passed to the component whether or not they are specified so everything is optional by default. If I go to the trouble of writing out the propType for a member, it better dam be there. 

So, React Types are required by default. However this can be overridden when requiring `react-types` or on a prop-by-prop basis.

```js
// global required option
var types = require('react-types').Types({required: false});

// prop-by-prop basis
var MyComponent = React.createClass({
  propTypes: types({
    name: String, // required
    bio: {type: String, required: false}, // optional
    insane: types.optional(Boolean) // optional
  })
});
```

### Using PropTypes inside of React Types?

PropTypes has been around way longer than React Types. People have built validation on top of it and have already written their types longhand. To accommodate this situation, React Types allows PropTypes to be placed into it using `types.raw(propType)`. Examples are best:

```js
var types = require('react-types');

var MyComponent = React.createClass({
  propTypes: types({
    name: types.raw(React.PropTypes.string.isRequired),
    email: types.raw(MySuperKewlEmailValidator)
  })
});
```

### What else ya got? (Related projects)

- [Reactbone](https://github.com/andrejewski/reactbone): React extensions for Backbone
- [Even More Flux (EMF)](https://github.com/andrejewski/emf): Class extensions and integrations for Flux

## Contributing

We can always have more tests: if you find a bug, create an issue or be **fabulous** and fix the problem and write the tests up yourself in a coherent pull request.

Run tests with the `npm test` command.

Follow me on [Twitter](http://chrisandrejewski.com/twitter) for updates or just for the lolz and please check out my other [repositories](https://github.com/andrejewski) if I have earned it. I thank you for reading.
 
