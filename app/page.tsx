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
    <div className="min-h-[3000px] text-[#7fff00] font-mono">
      <section className="h-screen flex flex-col justify-center items-center text-center px-5">
        <h1 className="text-6xl mb-5">Vicunai</h1>
        <p className="max-w-md mb-3">
          Meet Vicunai, your friendly thought-partner. Ask a question, share an idea—Vicunai listens and responds.
        </p>
        <a
          href="https://huggingface.co/afrideva/Tiny-Vicuna-1B-GGUF"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-base"
        >
          Powered by a Hugging Face model
        </a>
      </section>

      <section ref={modelSectionRef} className="h-[200vh] relative">
        <div className="sticky top-0 w-full h-screen">
          <Model rotationY={rotationY} />
        </div>
      </section>

      <section className="text-center mb-24 px-5">
        <p className="max-w-lg mx-auto">
          No need to be tech-savvy. Scroll down—now just type what&apos;s on your mind and let Vicunai respond.
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
