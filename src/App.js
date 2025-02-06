import {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Restaurant from './components/Restaurant'
import Login from './components/Login'
import Cart from './components/Cart'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {cartList: []}

  addCartItem = item => {
    this.setState(prevState => {
      const itemExists = prevState.cartList.some(
        cart => cart.dishId === item.dishId,
      )

      return {
        cartList: itemExists
          ? prevState.cartList.map(cart =>
              cart.dishId === item.dishId
                ? {
                    ...cart,
                    quantity: cart.quantity + item.quantity,
                    totalPrice: cart.totalPrice + item.totalPrice,
                  }
                : cart,
            )
          : [...prevState.cartList, item],
      }
    })
  }

  incrementCartItemQuantity = id =>
    this.setState(prevState => ({
      cartList: prevState.cartList.map(cart =>
        cart.dishId === id
          ? {
              ...cart,
              quantity: cart.quantity + 1,
              totalPrice: Number((cart.totalPrice + cart.dishPrice).toFixed(2)),
            }
          : cart,
      ),
    }))

  decrementCartItemQuantity = id =>
    this.setState(prevState => ({
      cartList: prevState.cartList
        .map(cart =>
          cart.dishId === id
            ? {
                ...cart,
                quantity: cart.quantity - 1,
                totalPrice: Number(
                  (cart.totalPrice - cart.dishPrice).toFixed(2),
                ),
              }
            : cart,
        )
        .filter(item => item.quantity > 0),
    }))

  removeCartItem = id =>
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(item => item.dishId !== id),
    }))

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    console.log({cartList})
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeAllCartItems: this.removeAllCartItems,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Restaurant} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
