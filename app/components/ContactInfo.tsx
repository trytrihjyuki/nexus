// app/components/ContactInfo.tsx
'use client';

import React from 'react'

export default function ContactInfo() {
    return (
      <div className="mt-10 text-center text-sm text-blue-300 space-y-2">
      {/* <a href={'https://pump.fun/coin/gzLHputT4Sp7yZtPgVKJHRDBWGmi9uuSCWDBrBUWX8w'} className="text-blue-500 underline font-semibold" target="_blank" rel="noopener noreferrer">
        {'gzLHputT4Sp7yZtPgVKJHRDBWGmi9uuSCWDBrBUWX8w'}
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
      <a href={'mailto:nexus@nexusishere.dev'} className="text-blue-500 underline font-semibold" target="_blank" rel="noopener noreferrer">
        {'mailto:nexus@nexusishere.dev'}
      </a>
      </div>
      </div>
    );
  }
  