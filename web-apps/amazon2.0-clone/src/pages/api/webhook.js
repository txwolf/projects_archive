import { buffer } from 'micro'
import * as admin from 'firebase-admin'

// Secure connection to firebase
const serviceAccount = require('../../../permissions.json')
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app()

// Establish connection to stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_SIGNING_SECRET

const fulfillOrder = async (session) => {
  console.log('fulfill order', session.id)

  return app.firestore()
    .collection('users')
    .doc(session.metadata.email)
    .collection('orders')
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      console.log('SUCCESS', session.id)
    })
    .catch(err => console.log(err.message))
}

export default async (req, res) => {
  if (req.method === 'POST') {
    const requestBuffer = await buffer(req)
    const payload = requestBuffer.toString()
    const sig = req.headers['stripe-signature']

    let event

    // Verify that event came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
    } catch (err) {
      console.log('ERROR', err)
      return res.status(400).send('Error ' + err.message)
    }

    // Handle the checkout.session.completed event
    if ((event.type = 'checkout.session.completed')) {
      const session = event.data.object

      // Fulfill the order
      return fulfillOrder(session).then(() => res.status(200)).catch((err) => res.status(400).send('Error' + err.message))
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
}
