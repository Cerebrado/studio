"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle, Star, Target, Timer } from "lucide-react";

export function HelpModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <HelpCircle className="mr-2 h-4 w-4" /> Help
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">How to Play</DialogTitle>
          <DialogDescription className="font-body">
            Follow these rules to become a Word Chain Champion!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 font-body">
          <div className="flex items-start gap-4">
            <Target className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold">The Goal</h3>
              <p className="text-sm text-muted-foreground">
                Create a chain of words by using the ending letters of the previous word as the start of your new word.
              </p>
            </div>
 </div>
 <div className="flex items-start gap-4">
 <Star className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
 <div>
 <h3 className="font-bold">Scoring</h3>
 <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-1">
 <li>Each letter in [E, S, I, A, R] is worth 1 point.</li>
 <li>Each letter in [J, Q, X, Z, W] is worth 5 points.</li>
 <li>Any other letter is worth 3 points.</li>
 </ul>
 </div>
          </div>
          <div className="flex items-start gap-4">
            <Star className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold">Rules & Scoring</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-1">
                <li>Your word must be longer than 5 characters.</li>
                <li>Your word must start with the last 2, 3, or 4 letters of the previous word.</li>
                <li>Longer chains grant more points and time bonuses!</li>
 <li className="pl-4"><strong>2-letter match:</strong> +10 extra points, +2 seconds</li>
 <li className="pl-4"><strong>3-letter match:</strong> +15 extra points, +3 seconds</li>
 <li className="pl-4"><strong>4-letter match:</strong> +25 extra points, +4 seconds</li>
              </ul>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Timer className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
            <div>
                <h3 className="font-bold">Beat The Clock</h3>
                <p className="text-sm text-muted-foreground">The game ends when the timer hits zero. Keep making valid words to add more time!</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
