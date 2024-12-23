// app/components/ContactInfo.tsx
'use client';

import React from 'react'

export default function ContactInfo() {
    return (
      <div className="mt-10 text-center text-sm text-blue-300 space-y-2">
      {/* <a href={'https://pump.fun/coin/GafmgW8ddNDs7WUmGsUAwxRRie9uJoqdXfEcjTwkGJKJ'} className="text-blue-500 underline font-semibold" target="_blank" rel="noopener noreferrer">
        {'GafmgW8ddNDs7WUmGsUAwxRRie9uJoqdXfEcjTwkGJKJ'}
      </a> */}
      <div><a href={'https://x.com/VICUNAI_'} className="text-blue-500 underline font-semibold" target="_blank" rel="noopener noreferrer">
        {'twitter'}
      </a>
      </div>
      <div>
      <a href={'https://github.com/trytrihjyuki/nexus'} className="text-blue-500 underline font-semibold" target="_blank" rel="noopener noreferrer">
        {'github'}
      </a>
      </div>
      <div>
      <a href={'mailto:nexus@trytrihjyuki.dev'} className="text-blue-500 underline font-semibold" target="_blank" rel="noopener noreferrer">
        {'mailto:nexus@trytrihjyuki.dev'}
      </a>
      </div>
      </div>
    );
  }
  