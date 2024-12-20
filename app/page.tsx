'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import ChatBox from './components/ChatBox';
import ContactInfo from './components/ContactInfo';

// Import the Model dynamically to prevent SSR
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

      const newRotation = scrollFrac * 2 * Math.PI; 
      setRotationY(newRotation);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ minHeight: '3000px', background: '#000', color: '#7fff00', fontFamily: 'monospace' }}>
      {/* Hero Section */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '20px', color: '#7fff00' }}>Vicunai</h1>
        <p style={{ maxWidth: '500px', marginBottom: '10px', color: '#7fff00' }}>
          Meet Vicunai, your friendly thought-partner. Ask a question, share an idea—Vicunai listens and responds.
        </p>
        <a
          href="https://huggingface.co/afrideva/Tiny-Vicuna-1B-GGUF"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#7fff00', textDecoration: 'underline', fontSize: '0.9em' }}
        >
          Powered by a Hugging Face model
        </a>
      </section>

      {/* Model Section */}
      <section ref={modelSectionRef} style={{ height: '200vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, width: '100%', height: '100vh' }}>
          <Model rotationY={rotationY} />
        </div>
      </section>

      {/* Text before chat */}
      <section style={{ textAlign: 'center', marginBottom: '100px', color: '#7fff00', padding: '0 20px' }}>
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>
          No need to be tech-savvy. Scroll done—now just type what's on your mind and let Vicunai respond.
        </p>
      </section>

      {/* Chat Section */}
      <section style={{ display: 'flex', justifyContent: 'center', marginBottom: '100px', padding: '0 20px' }}>
        <ChatBox />
      </section>

      {/* Contact Section */}
      <footer style={{ textAlign: 'center', marginBottom: '100px', color: '#7fff00' }}>
        <ContactInfo />
      </footer>
    </div>
  );
}