import Enzyme, {
  configure, shallow, mount, render,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// This file sets up enzyme for use with your testing files.
// Just import this into whatever file you need to use it, along with any method you need.

configure({ adapter: new Adapter() });
export { shallow, mount, render };
export default Enzyme;
