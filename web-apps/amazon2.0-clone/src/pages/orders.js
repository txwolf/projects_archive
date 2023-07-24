import React from 'react'
import Header from '../components/Header'
import { useSession, getSession } from "next-auth/react"
import db from '../../firebase'
import moment from 'moment'

import Order from '../components/Order'

const Orders = ({ orders }) => {
  const { data: session } = useSession()

  return (
    <div className='bg-white h-screen'>
      <Header />
      <main className='max-w-screen-lg mx-auto p-10'>
        <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>Your orders</h1>
        {session ? (
          <h2>{orders.length} Orders</h2>
        ) : <h2>Please sign in to see your orders</h2>}

        <div className='mt-5 space-y-4'>
          {orders?.map((order) => (
            <Order
              key={order.id}
              order={order} 
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Orders

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

  // Get the user credentials

  if (!session) {
    return {
      props: {}
    }
  }

  // firebase db
  const stripeOrders = await db.collection('users').doc(session.user.email).collection('orders').orderBy('timestamp', 'desc').get();

  // stripe orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async order => ({
      id: order.id,
      amount: order.data().amount,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100
        })
      ).data
    }))
  )

  return {
    props: {
      orders,
      session
    }
  }
}