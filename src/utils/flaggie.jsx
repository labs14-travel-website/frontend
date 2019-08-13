import React from 'react';
import PropTypes from 'prop-types';

const Feature = (flags, loading) => {
  /**
   * Allows toggling a JSX element based on flags
   * @param { string } flag Name of the feature flag toggle
   * @param { element[] } children Children components that you want to show/hide based on flag
   * @return { element[] } returns children based on the flag toggle
   */
  const Toggle = ({ flag, children }) => {
    if (!flag) {
      throw new Error('flag is required');
    }

    if (!children) {
      throw new Error('children are required to toggle');
    }

    if (flags[flag]) {
      return children;
    }

    return <></>;
  };

  Toggle.propTypes = {
    flag: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  /**
   * Allows switching between two JSX elements based on flags
   * @param { string } flag Name of the feature flag toggle
   * @param { element[] } children Two child components that you want to switch based on flag
   * @return { element[] } returns children based on the flag toggle
   */
  const Switch = ({ flag, children }) => {
    if (!flag) {
      throw new Error('flag is required');
    }

    if (children.length > 2 || children.length < 2) {
      throw new Error('You should have two (and only two) children to switch between');
    }

    if (loading) {
      return <></>;
    }

    if (flags[flag]) {
      return children[1];
    }

    return children[0];
  };

  Switch.propTypes = {
    flag: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  /**
   * Allows toggling a function callback based on flags
   * @param { string } flag Name of the feature flag toggle
   * @param { function } callback Callback function to return based on flag
   * @return { function } returns function based on the flag toggle
   */
  const fn = (flag, callback) => {
    if (!flag) {
      throw new Error('flag is required');
    }

    if (!callback) {
      throw new Error('Callback function is required');
    }

    if (flags[flag]) {
      return callback;
    }

    return null;
  };

  return {
    Toggle,
    Switch,
    fn,
  };
};

export default Feature;
