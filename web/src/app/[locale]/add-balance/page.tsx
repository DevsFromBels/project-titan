"use client"
import React from 'react'
import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js'

const page = () => {


  return (
    <div>
      <PayPalScriptProvider
        options={{
          clientId: "AbnSiCzB3qOVziCt0MOYoLKLpbHlraQxCshrxmNwbblsmLMJeSRVdmWfYjeUshS7X3eWwMF1ougGYxAq",
        }}
      >
        <PayPalButtons style={{
          color: 'silver',
          layout: 'horizontal',
          label: 'pay',
        }}
          createOrder={async () => {
            const res = await fetch('/api/checkout', {
              method: 'POST'
            })

            const order = await res.json()

            console.log(order)
            return order.id;
          }}
        />
      </PayPalScriptProvider>
    </div>
  )
}

export default page