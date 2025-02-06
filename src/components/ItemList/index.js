import Loader from 'react-loader-spinner'
import CartContext from '../../context/CartContext'
import './index.css'

const ItemList = props => {
  const {menuList, updateOrder, restaurantPageStatus} = props
  return (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value
        const addToCart = item => {
          addCartItem({
            ...item,
            totalPrice: Number((item.dishPrice * item.quantity).toFixed(2)),
          })
        }
        switch (restaurantPageStatus) {
          case 'LOADING':
            return (
              <div className="loader">
                <Loader
                  type="Oval"
                  height={60}
                  width={60}
                  color="#3498db"
                  ariaLabel="oval-loading"
                  secondaryColor="#4fa94d"
                  strokeWidth={3}
                  strokeWidthSecondary={3}
                />
              </div>
            )
          case 'SUCCESS':
            return (
              <ul className="item-list">
                {menuList?.map(item => (
                  <li key={item.dishId} className="item-container">
                    <div className="left-item-container">
                      <div
                        className={
                          item.dishType === 1
                            ? 'non-veg-mark'
                            : 'non-veg-mark veg-mark'
                        }
                      >
                        <p
                          className={
                            item.dishType === 1 ? 'non-veg' : 'non-veg veg'
                          }
                        >
                          {' '}
                        </p>
                      </div>
                      <div>
                        <h3 className="dish-name">{item.dishName}</h3>
                        <p className="dish-price">{`${item.dishCurrency} ${item.dishPrice}`}</p>
                        <p className="dish-description">
                          {item.dishDescription}
                        </p>
                        {item.dishAvailability ? (
                          <div>
                            {' '}
                            <div className="count-container">
                              <button
                                type="button"
                                className="in-de-button"
                                onClick={() =>
                                  updateOrder('decrease', item.dishId)
                                }
                                data-testid={`decrease quantity- ${item.dishId}`}
                              >
                                -
                              </button>
                              <p className="count">{item.quantity}</p>
                              <button
                                type="button"
                                className="in-de-button"
                                onClick={() =>
                                  updateOrder('increase', item.dishId)
                                }
                                data-testid={`increase quantity- ${item.dishId}`}
                              >
                                +
                              </button>
                            </div>{' '}
                            <button
                              type="button"
                              className="login-button"
                              disabled={item.quantity === 0}
                              data-testid={`addToCart-${item.dishId}`}
                              onClick={() => addToCart(item)}
                            >
                              ADD TO CART
                            </button>
                          </div>
                        ) : (
                          <p className="not-available">Not available</p>
                        )}
                        {item.addonCat.length > 0 && (
                          <p className="customization">
                            Customizations available
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="right-item-container">
                      <p className="calories">{`${item.dishCalories} calories`}</p>
                      <img
                        src={item.dishImage}
                        alt={item.dishName}
                        className="item-img"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )
          default:
            return null
        }
      }}
    </CartContext.Consumer>
  )
}

export default ItemList
