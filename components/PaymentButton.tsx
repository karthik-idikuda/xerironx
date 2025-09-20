'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Coffee, Heart, CheckCircle, AlertCircle } from 'lucide-react'

interface PaymentButtonProps {
  amount: number
  className?: string
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function PaymentButton({ amount, className = '' }: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'failed'>('idle')

  const handlePayment = async () => {
    try {
      setIsLoading(true)
      setPaymentStatus('idle')

      // Create order on server
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      })

      if (!response.ok) {
        throw new Error('Failed to create payment order')
      }

      const { orderId, amount: orderAmount, currency, key } = await response.json()

      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.async = true
        document.body.appendChild(script)
        
        await new Promise((resolve) => {
          script.onload = resolve
        })
      }

      // Initialize Razorpay checkout
      const options = {
        key,
        amount: orderAmount,
        currency,
        name: 'Xerironx Studio',
        description: 'Buy Me a Coffee - Support the Developer',
        image: '/xerironx logo.png',
        order_id: orderId,
        handler: async function (response: any) {
          try {
            // Verify payment on server
            const verifyResponse = await fetch('/api/payment', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(response),
            })

            if (verifyResponse.ok) {
              const result = await verifyResponse.json()
              if (result.success) {
                setPaymentStatus('success')
                // Show success message for 3 seconds
                setTimeout(() => setPaymentStatus('idle'), 3000)
              } else {
                setPaymentStatus('failed')
                setTimeout(() => setPaymentStatus('idle'), 3000)
              }
            } else {
              setPaymentStatus('failed')
              setTimeout(() => setPaymentStatus('idle'), 3000)
            }
          } catch (error) {
            console.error('Payment verification failed:', error)
            setPaymentStatus('failed')
            setTimeout(() => setPaymentStatus('idle'), 3000)
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        notes: {
          address: 'Support Xerironx Studio Development'
        },
        theme: {
          color: '#6366f1'
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false)
          }
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
      setIsLoading(false)

    } catch (error) {
      console.error('Payment failed:', error)
      setPaymentStatus('failed')
      setIsLoading(false)
      setTimeout(() => setPaymentStatus('idle'), 3000)
    }
  }

  const getButtonContent = () => {
    if (paymentStatus === 'success') {
      return (
        <>
          <CheckCircle className="w-4 h-4" />
          Thank You!
        </>
      )
    }
    
    if (paymentStatus === 'failed') {
      return (
        <>
          <AlertCircle className="w-4 h-4" />
          Try Again
        </>
      )
    }

    if (isLoading) {
      return (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
          />
          Processing...
        </>
      )
    }

    return (
      <>
        <Coffee className="w-4 h-4" />
        Buy Me a Coffee - ₹{amount}
      </>
    )
  }

  const getButtonStyles = () => {
    if (paymentStatus === 'success') {
      return 'bg-green-600 hover:bg-green-700 border-green-600'
    }
    
    if (paymentStatus === 'failed') {
      return 'bg-red-600 hover:bg-red-700 border-red-600'
    }

    return 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 border-orange-500'
  }

  return (
    <motion.button
      onClick={handlePayment}
      disabled={isLoading}
      className={`
        inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white
        transition-all duration-300 border-2 shadow-lg hover:shadow-xl
        disabled:opacity-50 disabled:cursor-not-allowed
        ${getButtonStyles()}
        ${className}
      `}
      whileHover={{ scale: isLoading ? 1 : 1.02 }}
      whileTap={{ scale: isLoading ? 1 : 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {getButtonContent()}
    </motion.button>
  )
}