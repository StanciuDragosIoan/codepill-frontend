"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();
  const session_id = searchParams?.get("session_id");
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    if (session_id) {
      fetch(`/api/checkout-session?session_id=${session_id}`)
        .then((res) => res.json())
        .then((data) => setStatus(`Payment status: ${data.payment_status}`));
    }
  }, [session_id]);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-800">
      <h1 className="text-white text-center text-2xl">
        🎉 Thank you for your payment!
      </h1>
      <p className="text-white mt-2">{status}</p>
    </div>
  );
}

export default function Success() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex justify-center items-center bg-gray-800 text-white">
          Loading...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
