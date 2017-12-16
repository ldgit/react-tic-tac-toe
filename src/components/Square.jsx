import React from 'react';
import PropTypes from 'prop-types';

export default function Square(props) {
  return (
    <button className="square">
      {props.value}
    </button>
  );
}

Square.defaultProps = {
  value: '',
};

Square.propTypes = {
  value: PropTypes.string,
};
