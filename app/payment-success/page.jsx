'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (!sessionId) {
        setStatus('Missing session ID.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.post('/api/payment/verify-session', {
          sessionId,
        });

        if (res.data?.success) {
          setStatus('Payment successful! Your subscription is now active.');
        } else {
          setStatus('Something went wrong verifying your payment.');
        }
      } catch (error) {
        console.error('Error verifying session:', error);
        setStatus('Failed to verify session. Please contact support.');
      } finally {
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col p-10">
      <h1 className="text-3xl font-bold mb-4">Payment Success</h1>
      {loading ? <p>Verifying your payment...</p> : <p>{status}</p>}
    </div>
  );
}

export default PaymentSuccessPage;
