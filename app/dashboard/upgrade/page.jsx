'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs/db';
import { USER_TABLE } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { Button } from '@/components/ui/button';

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

      console.log("✅ User fetched:", result[0]);
      setUserDetail(result[0]);
    } catch (error) {
      console.error("❌ Error fetching user detail:", error);
    }
  };

  const OnCheckoutClick = async () => {
    try {
      const result = await axios.post('/api/payment/checkout', {
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
      });

      console.log("✅ Checkout response:", result.data);

      const url = result.data?.url;

      if (url) {
        window.location.href = url;
      } else {
        console.error("❌ No Stripe checkout URL returned.");
        alert("Something went wrong with payment. Please try again.");
      }
    } catch (error) {
      console.error("❌ Checkout error:", error.response?.data || error.message);
      alert("An error occurred while starting payment. Try again later.");
    }
  };

  const onPaymentManage = async () => {
    if (!userDetail?.customerId) {
      console.error("❌ No customer ID found for user:", userDetail);
      alert("We couldn't find your payment info. Please contact support.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await axios.post("/api/payment/manage-payment", {
        customerId: userDetail.customerId,
      });

      console.log("✅ Manage Payment Response:", result.data);

      if (result.data?.url) {
        window.location.href = result.data.url;
      } else {
        console.error("❌ No billing portal URL returned.");
        alert("Unable to open billing portal. Try again later.");
      }
    } catch (error) {
      console.error("❌ Manage payment error:", error.response?.data || error.message);
      alert("Unexpected error. Please try again later.");
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
