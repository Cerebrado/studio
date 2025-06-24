"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from 'lucide-react';

// A simple SVG for Twitter's X logo
const XLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
);

// A simple SVG for Facebook's F logo
const FacebookLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
);


export function SocialShare({ score }: { score: number }) {
  const shareText = `I scored ${score} points in Word Chain Challenge! Can you beat me?`;
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const openShareWindow = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=400");
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`;
    openShareWindow(twitterUrl);
  };
  
  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`;
    openShareWindow(facebookUrl);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="font-headline text-lg">Share Your Score!</h3>
      <div className="flex gap-2">
        <Button onClick={shareOnTwitter} variant="outline" size="sm">
            <XLogo />
        </Button>
        <Button onClick={shareOnFacebook} variant="outline" size="sm">
            <FacebookLogo />
        </Button>
      </div>
    </div>
  );
}
