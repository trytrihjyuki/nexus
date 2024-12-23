// app/components/AnimatedBackground.tsx
'use client';

import React from 'react';

export default function AnimatedBackground() {
    return (
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-r from-purple-900 via-black to-blue-900 animate-gradient-x"></div>
    )
  }
  