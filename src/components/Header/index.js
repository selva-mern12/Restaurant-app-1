import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const shopName = localStorage.getItem('shop_name')
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        return (
          <div className="heading">
            <Link to="/">
              <h1 className="restaurant-name">{shopName}</h1>
            </Link>
            <div className="header-order-logout">
              <Link to="/cart">
                <p className="order-container">
                  My Orders
                  <AiOutlineShoppingCart size={35} />{' '}
                  <span className="order-count" data-testid="cart">
                    {cartList.length}
                  </span>
                </p>
              </Link>
              <button type="button" onClick={onLogout} className="login-button">
                Logout
              </button>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
