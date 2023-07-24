import React from 'react'
import { useStateValue } from './StateProvider'
import './Checkout.css'
import CheckoutProduct from './CheckoutProduct'
import Subtotal from './Subtotal'
import CurrencyFormat from 'react-currency-format'

const Checkout = () => {
  const [{ basket }] = useStateValue()

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          alt="Ads"
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
        />
        {basket.length === 0 ? (
          <div>
            <h2>Your Shopping Basket is empty</h2>
            <p>
              You have no items in your basked. To buy one or more items, click
              "Add to basket" next to the item.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="checkout__title">Your Shopping Basket</h2>
            {/* List checkout products */}
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                id={item.id}
                rating={item.rating}
              />
            ))}
          </div>
        )}
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  )
}

export default Checkout
