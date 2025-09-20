import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

// Initialize Razorpay instance with live credentials
const razorpay = new Razorpay({
  key_id: 'rzp_live_RJlCWJEWNvGbkT',
  key_secret: 'dhd2NuLToGgjprwPu8vVg2tj',
})

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'INR' } = await request.json()

    // Validate amount
    if (!amount || amount < 1) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        description: 'Buy Me a Coffee - Xerironx Studio',
        timestamp: new Date().toISOString(),
      },
    })

    return NextResponse.json({ 
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: 'rzp_live_RJlCWJEWNvGbkT',
    })
  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    )
  }
}

// Handle payment verification
export async function PUT(request: NextRequest) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature 
    } = await request.json()

    // Verify payment signature
    const crypto = require('crypto')
    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', 'dhd2NuLToGgjprwPu8vVg2tj')
      .update(body.toString())
      .digest('hex')

    if (expectedSignature === razorpay_signature) {
      // Payment verified successfully
      return NextResponse.json({ 
        success: true, 
        message: 'Payment verified successfully',
        paymentId: razorpay_payment_id 
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Payment verification failed' 
      }, { status: 400 })
    }
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    )
  }
}