"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { getRandomWord, isValidWord } from '@/lib/dictionary';
import { cn } from "@/lib/utils";
import { HelpModal } from '@/components/help-modal';
import { SocialShare } from '@/components/social-share';
import { AdBanner } from '@/components/ad-banner';
import { Timer, Send, HelpCircle, RefreshCw, XCircle, Award } from 'lucide-react';

const TOTAL_TIME = 30;

type GameState = 'idle' | 'playing' | 'ended';
type HistoryItem = {
  word: string;
  score: number;
};

export default function WordChainChallengePage() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [previousWord, setPreviousWord] = useState('');
  const [currentInput, setCurrentInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isWrong, setIsWrong] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setPreviousWord(getRandomWord());
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') {
      return;
    }

    if (timeLeft <= 0) {
      setGameState('ended');
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [gameState, timeLeft]);

  const handleStartGame = () => {
    setGameState('playing');
    setTimeLeft(TOTAL_TIME);
    setScore(0);
    setHistory([]);
    setCurrentInput('');
    setIsWrong(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handlePlayAgain = () => {
    setPreviousWord(getRandomWord());
    handleStartGame();
  };

  const handleSubmitWord = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (gameState !== 'playing') return;

    const newWord = currentInput.trim().toLowerCase();
    
    if (newWord.length <= 5) {
      toast({ variant: 'destructive', title: "Word too short", description: "Words must be longer than 5 characters." });
      setIsWrong(true);
      inputRef.current?.select();
      return;
    }

    if (!isValidWord(newWord)) {
      toast({ variant: 'destructive', title: "Not a valid word", description: "That word isn't in our dictionary." });
      setIsWrong(true);
      inputRef.current?.select();
      return;
    }
    
    let chainLength = 0;
    if (newWord.startsWith(previousWord.slice(-4))) {
        chainLength = 4;
    } else if (newWord.startsWith(previousWord.slice(-3))) {
        chainLength = 3;
    } else if (newWord.startsWith(previousWord.slice(-2))) {
        chainLength = 2;
    }

    if (chainLength === 0) {
      toast({ variant: 'destructive', title: "No chain!", description: `Word must start with the last 2, 3, or 4 letters of "${previousWord}".` });
      setIsWrong(true);
      inputRef.current?.select();
      return;
    }

    const points = chainLength * chainLength * 10;
    const timeBonus = chainLength;
    
    setScore(prev => prev + points);
    setTimeLeft(prev => Math.min(TOTAL_TIME, prev + timeBonus));
    setHistory(prev => [{ word: newWord, score: points }, ...prev]);
    setPreviousWord(newWord);
    setCurrentInput('');
    setIsWrong(false);

  }, [currentInput, gameState, previousWord, toast]);

  const progressValue = useMemo(() => (timeLeft / TOTAL_TIME) * 100, [timeLeft]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-2xl rounded-2xl overflow-hidden bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center p-6">
          <CardTitle className="font-headline text-4xl md:text-5xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Word Chain Challenge</CardTitle>
          <CardDescription className="font-body text-lg">Chain words to rack up points before time runs out!</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="bg-card rounded-lg p-4">
              <p className="text-sm text-muted-foreground font-body">Score</p>
              <p className="font-headline text-4xl font-bold text-primary">{score}</p>
            </div>
            <div className="bg-card rounded-lg p-4">
              <p className="text-sm text-muted-foreground font-body">Time Left</p>
              <p className="font-headline text-4xl font-bold text-primary">{timeLeft}s</p>
            </div>
          </div>

          <div>
             <Progress value={progressValue} className={cn("w-full h-3", progressValue < 20 && "accent-destructive")} />
          </div>

          <div className="text-center bg-secondary/50 p-4 rounded-lg">
            <p className="font-body text-muted-foreground mb-1">Previous Word</p>
            <p className="font-headline text-3xl font-bold tracking-widest uppercase text-primary-foreground bg-primary rounded-md px-4 py-2 inline-block shadow-inner">{previousWord}</p>
          </div>
          
          {gameState === 'playing' && (
            <form onSubmit={handleSubmitWord} className="relative flex gap-2">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Enter your word..."
                value={currentInput}
                onChange={(e) => {
                  setCurrentInput(e.target.value);
                  setIsWrong(false);
                }}
                autoComplete="off"
                className={cn("text-xl h-14 pr-12", isWrong && "border-destructive ring-destructive ring-2")}
                disabled={gameState !== 'playing'}
              />
              {isWrong && <XCircle className="absolute right-14 top-1/2 -translate-y-1/2 w-6 h-6 text-destructive" />}
              <Button type="submit" size="icon" className="h-14 w-14" disabled={gameState !== 'playing'}>
                <Send className="w-6 h-6" />
              </Button>
            </form>
          )}

          {history.length > 0 && (
             <div className="space-y-2">
                <h3 className="font-headline text-lg text-center">History</h3>
                <ScrollArea className="h-40 w-full rounded-md border p-4 bg-card/50">
                    <ul className="space-y-2">
                        {history.map((item, index) => (
                            <li key={index} className="flex justify-between items-center bg-secondary/30 p-2 rounded-md animate-in fade-in slide-in-from-top-2 duration-500">
                                <span className="font-body">{item.word}</span>
                                <span className="font-headline font-bold text-accent">+ {item.score}</span>
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
             </div>
          )}

          {gameState === 'ended' && (
            <div className="text-center p-8 bg-card rounded-lg animate-in fade-in zoom-in-95 duration-500">
                <Award className="w-16 h-16 mx-auto text-accent" />
                <h2 className="font-headline text-4xl mt-4">Game Over!</h2>
                <p className="font-body text-xl mt-2">You scored <span className="font-bold text-primary">{score}</span> points!</p>
            </div>
          )}

        </CardContent>
        <CardFooter className="p-6 flex justify-center gap-4">
          {gameState === 'idle' && (
            <>
              <HelpModal />
              <Button onClick={handleStartGame} size="lg" className="font-headline text-xl px-10 py-6">Start Game</Button>
            </>
          )}
          {gameState === 'ended' && (
            <div className="flex flex-col items-center gap-4">
                <SocialShare score={score} />
                <Button onClick={handlePlayAgain} size="lg" className="font-headline text-xl" variant="outline">
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Play Again
                </Button>
            </div>
          )}
        </CardFooter>
      </Card>
      <AdBanner />
    </div>
  );
}
