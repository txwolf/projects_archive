import { useStateValue } from './StateProvider'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'

const Subtotal = () => {
  const [{ basket }] = useStateValue()
  console.log('basket', basket)

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items):
              <strong>{`${value}`}</strong>
            </p>
            <small className="subtotal__checkbox">
              <input type="checkbox" name="gift" />
              <label for="gift">This order contains gift</label>
            </small>
          </>
        )}
        decimalScale={2}
        value={basket.reduce((a, b) => {
          return a + b.price
        }, 0)}
        displayType={'text'}
        thousandSeperator={true}
        prefix={'$'}
      ></CurrencyFormat>
      <button className="subtotal__button">Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal
