import React from 'react'
import Image from 'next/image'
import Currency from 'react-currency-formatter'
import { StarIcon } from '@heroicons/react/solid'
import { useDispatch } from 'react-redux'
import { addToBasket, removeFromBasket } from '../slices/basketSlice'

const CheckoutProduct = ({ product }) => {
  const dispatch = useDispatch()

  const { id, title, price, description, category, image, hasPrime, rating } =
    product

  const addItemToBasket = () => {
    dispatch(addToBasket(product))
  } 

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({id}))
  }

  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />

      <div className="col-span-3 mx5">
        <p>{title}</p>
        <div className="flex mt-2">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-400"></StarIcon>
            ))}
        </div>
        <p className="text-sm my-2 line-clamp-3">{description}</p>
        <Currency quantity={price} currency="USD" />

        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              className="w-12"
              src="https://links.papareact.com/fdw"
              alt=""
            />
            <p className="text-xs text-gray-500">FREE Next-day delivery</p>
          </div>
        )}
      </div>

      <div className='flex flex-col space-y-2 my-auto justify-self-end'>
      <button onClick={addItemToBasket} className='button mt-auto'>Add to Basket</button>
      <button onClick={removeItemFromBasket} className='button mt-auto'>Remove from Basket</button>
      </div>

    </div>
  )
}

export default CheckoutProduct
