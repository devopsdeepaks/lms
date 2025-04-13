"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { USER_TABLE } from '@/configs/schema';
import { db } from '@/configs/db';

function Upgrade() {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    if (user) {
      GetUserDetail();
    }
  }, [user]);

  const GetUserDetail = async () => {
    try {
      const result = await db
        .select()
        .from(USER_TABLE)
        .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

      setUserDetail(result[0]);
    } catch (error) {
      console.error("Error fetching user detail:", error);
    }
  };

  const OnCheckoutClick = async () => {
    try {
      const result = await axios.post('/api/payment/checkout', {
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
      });

      const url = result.data?.url;

      if (url) {
        window.location.href = url;
      } else {
        console.error("No Stripe checkout URL returned.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  const onPaymentManage = async () => {
    const customerId = userDetail?.customerId;
    console.log("customerId:", customerId);
  
    if (!customerId) {
      console.error("Customer ID is undefined.");
      alert("Customer ID is missing. Please try again later.");
      return;
    }
  
    try {
      const result = await axios.post("/api/payment/manage-payment", {
        customerId,
      });
  
      if (result.data?.error) {
        console.error("Backend error:", result.data.error);
        alert("There was an issue processing your payment. Please try again later.");
        return;
      }
  
      const url = result.data?.url;
      if (url) {
        window.location.href = url;
      } else {
        console.error("No Stripe portal URL returned.");
        alert("There was an issue redirecting to the payment portal. Please try again later.");
      }
    } catch (error) {
      // Log the error properly based on its format
      if (error.response) {
        // This is an axios error with a response from the server
        console.error("Manage payment error (Axios Response):", error.response.data);
        alert("There was an issue with the backend request. Please try again later.");
      } else if (error.request) {
        // This is an error where no response was received
        console.error("Manage payment error (No Response):", error.request);
        alert("There was no response from the server. Please check your network and try again.");
      } else {
        // This is any other error (e.g., malformed request)
        console.error("Manage payment error (Other):", error.message);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };
  
  

  return (
    <div className="min-h-screen bg-white px-4 py-10 md:px-20">
      <h1 className="text-3xl font-bold mb-6">Plans</h1>
      <p className="text-gray-600 mb-10">Update your plan to generate unlimited courses for your exam</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Free Plan */}
        <div className="border rounded-lg shadow p-6 flex flex-col items-start">
          <h2 className="text-xl font-semibold mb-2">Free</h2>
          <p className="text-3xl font-bold mb-4">
            $0<span className="text-sm font-normal">/month</span>
          </p>
          <ul className="space-y-2 mb-6 text-gray-700">
            <li>✓ 5 PDF Upload</li>
            <li>✓ Unlimited Notes Taking</li>
            <li>✓ Email support</li>
            <li>✓ Help center access</li>
          </ul>
          <span className="text-blue-600 font-medium">Current Plan</span>
        </div>

        {/* Monthly Plan */}
        <div className="border rounded-lg shadow p-6 flex flex-col items-start">
          <h2 className="text-xl font-semibold mb-2">Monthly</h2>
          <p className="text-3xl font-bold mb-4">
            $9.99<span className="text-sm font-normal">/month</span>
          </p>
          <ul className="space-y-2 mb-6 text-gray-700">
            <li>✓ Unlimited PDF Upload</li>
            <li>✓ Unlimited Notes Taking</li>
            <li>✓ Email support</li>
            <li>✓ Help center access</li>
          </ul>

          {userDetail?.isMember === false ? (
            <Button
              onClick={OnCheckoutClick}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Get Started
            </Button>
          ) : (
            <Button
              onClick={onPaymentManage}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Manage Payment
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
