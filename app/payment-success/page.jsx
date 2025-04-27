// /app/payment-success/page.jsx
'use client';

import React, { Suspense } from 'react';
import PaymentSuccessPage from './PaymentSuccessPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessPage />
    </Suspense>
  );
}
