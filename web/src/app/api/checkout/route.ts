import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

const client_id =
  "AbnSiCzB3qOVziCt0MOYoLKLpbHlraQxCshrxmNwbblsmLMJeSRVdmWfYjeUshS7X3eWwMF1ougGYxAq";
const secret_id =
  "ECmaYnf7gGqh5Zu3VF2bUe7Kv-PAlDKE1rwpvflDGnLZPBDtkCEu1YTrgwcZZLJKx3DrCa4Wohf5zt39";

const environment = new paypal.core.SandboxEnvironment(client_id, secret_id);

const client = new paypal.core.PayPalHttpClient(environment);

export async function POST() {

  const request = new paypal.orders.OrdersCreateRequest()

  const requestBody = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "100.0", // Total amount
        },
        items: [
          {
            name: "Checkout balance",
            description: "Paying on balance",
            quantity: "1",
            unit_amount: {
              currency_code: "USD",
              value: "600.0" // Unit price per item
            },
            category: "DIGITAL_GOODS",
          }
        ]
      }
    ]
  };
  

  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "100.0",
        },
        items: [
          {
            name: "Checkout balance",
            description: "Paying on balance",
            quantity: "1",
            unit_amount: {
              currency_code: "USD",
              value: "600.0"
            },
            category: "DIGITAL_GOODS",
          }
        ]
      }
    ]
  })
  
  const response = await client.execute(request);

  console.log(response)

  return NextResponse.json(
    {
      id: response.result.id,
    },
    {
      status: 201,
    }
  );
}
