import React from "react";

const MisCuroso = () => {
  return (
    <div>
      {li.map((item) => (
        <div key={item.id} className="border p-2 mb-2">
          <p>ID: {item.id}</p>
          <p>Intent: {item.intent}</p>
        </div>
      ))}
    </div>
  );
};

export default MisCuroso;

const li = [
  {
    id: "0JY73096FC069214V",
    intent: "CAPTURE",
    status: "COMPLETED",
    payment_source: {
      paypal: {
        email_address: "sb-mp8gi49985343@personal.example.com",
        account_id: "7X35UYHDULVBJ",
        account_status: "VERIFIED",
        name: {
          given_name: "John",
          surname: "Doe",
        },
        address: {
          country_code: "US",
        },
      },
    },
    purchase_units: [
      {
        reference_id: "COURSE_1",
        amount: {
          currency_code: "USD",
          value: "50.00",
          breakdown: {},
        },
        payee: {
          email_address: "sb-j16z849936778@business.example.com",
          merchant_id: "5EQZ7ZP8H9SVE",
          display_data: {
            brand_name: "Tu Academia",
          },
        },
        custom_id: "4",
        shipping: {
          name: {
            full_name: "John Doe",
          },
          address: {
            address_line_1: "2211 N First St",
            admin_area_2: "San Jose",
            admin_area_1: "CA",
            postal_code: "95131",
            country_code: "US",
          },
        },
        payments: {
          captures: [
            {
              id: "18411413EM592172Y",
              status: "COMPLETED",
              amount: {
                currency_code: "USD",
                value: "50.00",
              },
              final_capture: true,
              seller_protection: {
                status: "ELIGIBLE",
                dispute_categories: [
                  "ITEM_NOT_RECEIVED",
                  "UNAUTHORIZED_TRANSACTION",
                ],
              },
              seller_receivable_breakdown: {
                gross_amount: {
                  currency_code: "USD",
                  value: "50.00",
                },
                paypal_fee: {
                  currency_code: "USD",
                  value: "2.24",
                },
                net_amount: {
                  currency_code: "USD",
                  value: "47.76",
                },
              },
              custom_id: "4",
              links: [
                {
                  href: "https://api.sandbox.paypal.com/v2/payments/captures/18411413EM592172Y",
                  rel: "self",
                  method: "GET",
                },
                {
                  href: "https://api.sandbox.paypal.com/v2/payments/captures/18411413EM592172Y/refund",
                  rel: "refund",
                  method: "POST",
                },
                {
                  href: "https://api.sandbox.paypal.com/v2/checkout/orders/0JY73096FC069214V",
                  rel: "up",
                  method: "GET",
                },
              ],
              create_time: "2026-03-17T07:02:10Z",
              update_time: "2026-03-17T07:02:10Z",
            },
          ],
        },
      },
    ],
    payer: {
      name: {
        given_name: "John",
        surname: "Doe",
      },
      email_address: "sb-mp8gi49985343@personal.example.com",
      payer_id: "7X35UYHDULVBJ",
      address: {
        country_code: "US",
      },
    },
    create_time: "2026-03-17T07:02:10Z",
    update_time: "2026-03-17T07:02:10Z",
    links: [
      {
        href: "https://api.sandbox.paypal.com/v2/checkout/orders/0JY73096FC069214V",
        rel: "self",
        method: "GET",
      },
    ],
  },
];
