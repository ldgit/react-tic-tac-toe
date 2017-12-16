import React from 'react';
import PropTypes from 'prop-types';

export default function Title({ name }) {
  return <h1>Hello {name}</h1>;
}

Title.propTypes = {
  name: PropTypes.string.isRequired,
};
