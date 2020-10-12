import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  loadCart,
  setCount,
  removeCartItem,
  syncCart,
  setType
} from '../../redux/reducers/cart';
import './Home.css';
import logo from './logo.svg';
import { CartItem } from '../../components';
import { dispatch } from '../../store'

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  }
}

// const mapDispatchToProps = () => ({
  // loadCartAction: dispatch(loadCart)
// })

class Home extends React.Component {
  savedTimeout = {}

  static propTypes = {
    cart: PropTypes.object,
    getCartItems: PropTypes.func,
    setCount: PropTypes.func,
    removeCartItem: PropTypes.func,
    syncCart: PropTypes.func,
    setType: PropTypes.func,
  }

  componentDidMount() {
    dispatch(loadCart())
  }

  _syncData = (id) => {
    if (this.savedTimeout && this.savedTimeout[id]) clearTimeout(this.savedTimeout[id])

    this.savedTimeout[id] = setTimeout(() => {
      const { cart } = this.props;
      dispatch(syncCart(id))
    }, 1000);
  }

  _updateCount = (id, count) => {
    dispatch(setCount({id, count}))
    this._syncData(id);
  }

  _updateType = (id, type) => {
    dispatch(setType({id, type}))
    this._syncData(id);
  }

  _removeItem = id => {
    dispatch(removeCartItem(id))
  }

  _renderItems = (items) => {
    return items.map(
      item => <CartItem
        {...item}
        key={item.id}
        onRemove={this._removeItem}
        onIncrease={this._updateCount}
        onDecrease={this._updateCount}
        onChangeType={this._updateType}
      />
    )
  }

  render() {
    const { cart } = this.props;
    return (
      <div className="home">
        <div className="header">
          <img src={logo} alt="adyax."/>
          <h1>Front-End Developer<span>.</span></h1>
          <p>
            Adyax’s core values take top priority: we care for our client, and we care for our people. Staff and clients work in partnership with consistent,  transparent communication.
          </p>
        </div>
        <div className="contentBg">
          <div className="content">
            {cart?.items && this._renderItems(cart?.items)}
            <div className="total">
              {cart?.items.reduce((prev, curr) => prev + curr.count*curr.amount, 0).toFixed(2)}&euro;
            </div>
          </div>
        </div>
        <div className="footerBg">
          <div className="footer">
            <p>Adyax specializes in working with multi-national, multi-brand companies on a wide range of customer, client and employee-facing solutions. </p>
          </div>
        </div>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => {
  // return {
    // getCartItems: () => dispatch(loadCart()),
    // setCount: (id, count) => dispatch(setCount(id, count)),
    // setType: (id, type) => dispatch(setType(id, type)),
    // removeItem: (id) => dispatch(removeItem(id)),
    // syncData: (id, cart) => dispatch(syncData(id, cart)),
  // }
// }

export default connect(mapStateToProps)(Home)
