import React from 'react';
import PropTypes from 'prop-types';

import './IncDec.css';

export default class IncDec extends React.Component {
  static propTypes = {
    inc: PropTypes.func,
    dec: PropTypes.func,
    val: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
  }

  static defaultProps = {
    min: 0,
    max: 10
  }

  render() {
    const { id, dec, val, inc, max, min } = this.props;
    return (
      <div className="IncDec">
        <input
          type="button"
          className="act"
          onClick={() => {inc(id, val-1)}}
          disabled={val <= min}
        />
        <div className="val">{val}</div>
        <input
          type="button"
          className="act inc"
          onClick={() => {dec(id, val+1)}}
          disabled={val >= max}
        />
      </div>
    );
  }
}
