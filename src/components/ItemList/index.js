import './index.css'

const ItemList = props => {
  const {menuList, updateOrder} = props

  return (
    <ul className="item-list">
      {menuList?.map((item, index) => (
        <li key={item.dishId} className="item-container">
          <div className="left-item-container">
            <div
              className={
                item.dishType === 1 ? 'non-veg-mark' : 'non-veg-mark veg-mark'
              }
            >
              <p className={item.dishType === 1 ? 'non-veg' : 'non-veg veg'}>
                {' '}
              </p>
            </div>
            <div>
              <h3 className="dish-name">{item.dishName}</h3>
              <p className="dish-price">{`${item.dishCurrency} ${item.dishPrice}`}</p>
              <p className="dish-description">{item.dishDescription}</p>
              {item.dishAvailability ? (
                <div className="count-container">
                  <button
                    type="button"
                    className="in-de-button"
                    onClick={() =>
                      updateOrder('decrease', index, item.dishName)
                    }
                  >
                    -
                  </button>
                  <p className="count">{item.noOfDish}</p>
                  <button
                    type="button"
                    className="in-de-button"
                    onClick={() =>
                      updateOrder('increase', index, item.dishName)
                    }
                  >
                    +
                  </button>
                </div>
              ) : (
                <p className="not-available">Not available</p>
              )}
              {item.addonCat.length > 0 && (
                <p className="customization">Customizations available</p>
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
}

export default ItemList
