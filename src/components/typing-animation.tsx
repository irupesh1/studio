
"use client";

import { useState, useEffect } from 'react';

interface TypingAnimationProps {
  text: string;
}

export function TypingAnimation({ text }: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 20); // Adjust speed of typing here

    return () => clearInterval(intervalId);
  }, [text]);

  return <>{displayedText}</>;
}
