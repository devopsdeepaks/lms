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
  const [isLoading, setIsLoading] = useState(false);

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
      console.log("result data", result.data);
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
    if (!userDetail?.customerId) {
      console.error("No customer ID found for user");
      alert("Unable to find your payment information. Please contact support.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await axios.post("/api/payment/manage-payment", {
        customerId: userDetail.customerId,
      });

      if (result.data?.error) {
        console.error("Payment management error:", result.data.error);
        alert("There was an error managing your payment. Please try again later.");
        return;
      }

      if (!result.data?.url) {
        console.error("No portal URL returned from server");
        alert("Unable to access payment portal. Please try again later.");
        return;
      }

      window.location.href = result.data.url;
    } catch (error) {
      console.error("Payment management error:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server response:", error.response.data);
        alert("There was an error processing your request. Please try again later.");
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        alert("Unable to connect to the server. Please check your internet connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", error.message);
        alert("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
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
              disabled={isLoading}
              className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {isLoading ? 'Loading...' : 'Manage Payment'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
