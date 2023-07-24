import Image from 'next/image'
import React, { useState } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import Currency from 'react-currency-formatter'
import { useDispatch } from 'react-redux'
import { addToBasket } from '../slices/basketSlice'

const MAX_RATING = 5
const MIN_RATING = 1

const Product = ({ product, span }) => {
  const dispatch = useDispatch()
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING,
  )
  const [hasPrime] = useState(Math.random() < 0.5)

  const { id, title, price, description, category, image } = product

  const addItemToBasket = () => {
    dispatch(addToBasket({...product, rating, hasPrime}))
  }

  return (
    <div className={`relative flex flex-col m-5 bg-white z-30 p-10 ${span && `md:col-span-${2}`}`}>
      <p className="absolute top-2 right-2 text-xs italic text-gray-100">
        {category}
      </p>
      <Image src={image} height={200} width={200} objectFit="contain" />

      <h4 className="my-3">{title}</h4>

      <div className="flex">{Array(rating)
          .fill()
          .map((_, i) => (<StarIcon key={i} className="h-5 text-yellow-400"></StarIcon>))}
      </div>

      <p className="text-xs mt-2 mb-2 line-clamp-2">{description}</p>

      <div className="">
        <Currency quantity={price} currency="USD" />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2">
          <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
          <p className="text-xs text-gray-500">FREE Next-day delivery</p>
        </div>
      )}

      <button onClick={addItemToBasket} className="mt-auto button">Add to Basket</button>
    </div>
  )
}

export default Product
