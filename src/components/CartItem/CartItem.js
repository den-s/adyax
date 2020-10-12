import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import IncDec from '../IncDec/IncDec';
import './CartItem.css'

import trashIcon from './ico_trash.png';

export default class CartItem extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    img: PropTypes.string,
    amount: PropTypes.number,
    count: PropTypes.number,
    types: PropTypes.array,
    onIncrease: PropTypes.func,
    onDecrease: PropTypes.func,
    onRemove: PropTypes.func,
    onChangeType: PropTypes.func,
  }
  render() {
    const { id,
      title,
      description,
      img,
      amount,
      type,
      types,
      count,
      onIncrease,
      onDecrease,
      onRemove,
      onChangeType
    } = this.props;
    return (
      <div className="CartItem">
        <div className="img">
          <img src={img} alt=""/>
        </div>
        <div className="contentCI">
          <p className="title">{title}</p>
          <p className="description">{description}</p>
          {/* <Dropdown
            *   className="ddTypes"
            *   options={types.map(item => {
            *     return {label: item.toUpperCase(), value: item}
            *   })}
            *   value={type.toUpperCase()}
            *   placeholder="Select an option"
            *   onChange={({value}) => onChangeType(id, value)}
            * /> */}
        </div>
        <div className="actions">
          <a className="remove" onClick={onRemove.bind(this, id)}><img src={trashIcon} alt="remove"/></a>
          <div className="counter">
            <IncDec inc={onIncrease} dec={onDecrease} id={id} val={count}/>
            <div className="amount">{(amount*count).toFixed(2)}&euro;</div>
          </div>
        </div>
        <div className="clearer"></div>
      </div>
    );
  }
}
