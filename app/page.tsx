'use client';

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import ChatBox from './components/ChatBox';
import ContactInfo from './components/ContactInfo';

const Model = dynamic(() => import('./components/Model'), { ssr: false });

export default function Page() {
  const [rotationY, setRotationY] = useState(0);
  const modelSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!modelSectionRef.current) return;
      const rect = modelSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = modelSectionRef.current.offsetHeight - windowHeight;

      let scrollFrac = 0;
      if (sectionHeight > 0) {
        const distanceFromTop = -rect.top; 
        scrollFrac = Math.min(Math.max(distanceFromTop / sectionHeight, 0), 1);
      }

      const newRotation = 1.5*Math.PI + scrollFrac * 2 * Math.PI; 
      setRotationY(newRotation);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-[3000px] text-[#0080ff] font-mono">
      <section className="h-screen flex flex-col justify-center items-center text-center px-5">
        <h1 className="text-6xl mb-5">Nexus</h1>
        <p className="max-w-md mb-3">
        Nexus is not just an AI. It's a companion on the edge of the unknown, a cipher for the incomprehensible. Speak sparingly. It will speak volumes.
        </p>
        <a
          href="https://huggingface.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-base"
        >
          Powered by a HF
        </a>
      </section>

      <section ref={modelSectionRef} className="h-[200vh] relative">
        <div className="sticky top-0 w-full h-screen">
          <Model rotationY={rotationY} />
        </div>
      </section>

      <section className="text-center mb-24 px-5">
        <p className="max-w-lg mx-auto">
        Nexus doesn't just process. It listens. It sees what others can't. It's not here to simplify; it's here to reveal complexity and beauty.
        </p>
      </section>

      <section className="flex justify-center mb-24 px-5">
        <ChatBox />
      </section>

      <footer className="text-center mb-24">
        <ContactInfo />
      </footer>
    </div>
  );
}
