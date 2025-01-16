"use client";
import axios from "axios";
import React from "react";

const page = () => {
  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "https://a.khalti.com/api/v2/epayment/initiate",
        {
          return_url: "https://your-demo-site.com/return",
          website_url: "https://your-demo-site.com/",
          amount: 1000, // Amount in paisa (e.g., Rs. 10 = 1000 paisa)
          purchase_order_id: "DemoOrder01",
          purchase_order_name: "Test Product",
          customer_info: {
            name: "Demo User",
            email: "demo@example.com",
            phone: "9800000000",
          },
        },
        {
          headers: {
            Authorization:
              "Key test_secret_key_dc74b0b331f14a10a4ef6b76c74754a8",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      // Redirect user to the payment URL
      const { payment_url } = response.data;
      window.location.href = payment_url;
    } catch (error: any) {
      console.error(
        "Error initiating payment:",
        error.response?.data || error.message
      );
    }
  };
  return (
    <div>
      {/* <h1>Khalti Payment Demo</h1>
      <button
        onClick={handlePayment}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Pay with Khalti
      </button> */}

      <form
        // action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        action="https://uat.esewa.com.np/epay/main"
        method="POST"
      >
        <input type="text" id="amount" name="amount" value="100" required />
        <input
          type="text"
          id="tax_amount"
          name="tax_amount"
          value="10"
          required
        />
        <input
          type="text"
          id="total_amount"
          name="total_amount"
          value="110"
          required
        />
        <input
          type="text"
          id="transaction_uuid"
          name="transaction_uuid"
          value="hello123"
          required
        />
        <input
          type="text"
          id="product_code"
          name="product_code"
          value="EPAYTEST"
          required
        />
        <input
          type="text"
          id="product_service_charge"
          name="product_service_charge"
          value="0"
          required
        />
        <input
          type="text"
          id="product_delivery_charge"
          name="product_delivery_charge"
          value="0"
          required
        />
        <input
          type="text"
          id="success_url"
          name="success_url"
          value="https://esewa.com.np"
          required
        />
        <input
          type="text"
          id="failure_url"
          name="failure_url"
          value="https://google.com"
          required
        />
        <input
          type="text"
          id="signed_field_names"
          name="signed_field_names"
          value="total_amount,transaction_uuid,product_code"
          required
        />
        <input
          type="text"
          id="signature"
          name="signature"
          value="i94zsd3oXF6ZsSr/kGqT4sSzYQzjj1W/waxjWyRwaME="
          required
        />
        <input value="Submit" type="submit" />
      </form>
    </div>
  );
};

export default page;
