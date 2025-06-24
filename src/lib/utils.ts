import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Function to calculate the score of a word
export function calculateScore(word: string, previousWord: string): { score: number, timeBonus: number, isValidChain: boolean } {
  let score = 0;
  const letterScores: { [key: string]: number } = {
    'E': 1, 'S': 1, 'I': 1, 'A': 1, 'R': 1,
    'J': 5, 'Q': 5, 'X': 5, 'Z': 5, 'W': 5,
  };

  for (const letter of word.toUpperCase()) {
    score += letterScores[letter] || 3;
  }

  let timeBonus = 0;
  let matchingLetters = 0;
  let isValidChain = true;
  if(previousWord.slice(-4) === word.slice(0,4))
  {
    matchingLetters = 4;
    score += 25;
    timeBonus = 4;
  }
  else if(previousWord.slice(-3) === word.slice(0,3))
  {
    matchingLetters = 3;
    score += 15;
    timeBonus = 3;
  }
  else if(previousWord.slice(-2) === word.slice(0,2))
  {
    matchingLetters = 2;
    score += 10;
    timeBonus = 2;
  }
else {
    isValidChain = false;
  }

  return { score, timeBonus, isValidChain};
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
