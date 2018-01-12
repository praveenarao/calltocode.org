import register from 'ignore-styles'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

register(undefined, (module, filename) => {
  module.exports = new Proxy({}, {
    get: function(target, property, receiver) {
      // FROM JULIAN: This is stolen from: https://github.com/bmatcuk/mock-css-modules/blob/master/index.js
      // Without this, __esModule will return "__esModule" which will confuse
      // babel into thinking this module was built with ES6 exports since it's
      // "truthy". So, in this one special case, we return a value (false).
      if (property === '__esModule') return false;
      return property;
    }
  });
})

configure({ adapter: new Adapter() });
