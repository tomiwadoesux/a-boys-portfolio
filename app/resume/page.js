"use client";

import { useEffect } from 'react';

export default function ResumePage() {
  useEffect(() => {
    window.location.href = 'https://drive.google.com/file/d/1UcuH-oolA0c_vMYflzil6Dl1_EnEnOxd/view';
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg">Redirecting to Resumé...</p>
    </div>
  );
}
