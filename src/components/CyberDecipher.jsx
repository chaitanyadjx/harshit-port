import React, { useState, useEffect, useRef } from 'react';

const CIPHER_CHARS = '0123456789ABCDEF!@#$%&*<>[]/_+=⌖⎔';

export default function CyberDecipher({ text, delay = 0, speed = 25, className = '', trigger = true, onComplete }) {
  const [displayText, setDisplayText] = useState(text);
  const animating = useRef(false);

  useEffect(() => {
    if (!trigger || !text) return;
    let iteration = 0;
    let timeoutId;
    let intervalId;

    timeoutId = setTimeout(() => {
      animating.current = true;
      intervalId = setInterval(() => {
        setDisplayText(() => {
          return text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration) {
                return text[index];
              }
              return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
            })
            .join('');
        });

        if (iteration >= text.length) {
          clearInterval(intervalId);
          animating.current = false;
          if (onComplete) onComplete();
        }

        iteration += 1 / 2;
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, delay, speed, trigger, onComplete]);

  return <span className={`cyber-decipher ${className}`}>{displayText}</span>;
}
