"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const LOCAL_STORAGE_KEY = "adAccountId";

export function AdBanner() {
  const [adAccountId, setAdAccountId] = useState("");
  const [inputAccountId, setInputAccountId] = useState("");
  const [isConfiguring, setIsConfiguring] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedId = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedId) {
      setAdAccountId(storedId);
      setInputAccountId(storedId);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, inputAccountId);
    setAdAccountId(inputAccountId);
    toast({ title: "Ad Account ID Saved!", description: "Your ads would now be displayed." });
    setIsConfiguring(false);
  };

  return (
    <div className="w-full max-w-2xl mt-8 text-center">
      <div className="bg-card/80 rounded-lg p-4 h-24 flex items-center justify-center border-2 border-dashed">
        <p className="text-muted-foreground font-body">
          {adAccountId ? `Ad placeholder for account: ${adAccountId}` : "Your Ad Here"}
        </p>
      </div>
      <div className="mt-2">
        <Button variant="link" size="sm" onClick={() => setIsConfiguring(!isConfiguring)}>
          {isConfiguring ? "Hide" : "Configure Ad Account"}
        </Button>
      </div>
      <div className={cn("transition-all duration-300 ease-in-out overflow-hidden", isConfiguring ? "max-h-40 opacity-100" : "max-h-0 opacity-0")}>
        <div className="flex gap-2 mt-2">
          <Input
            type="text"
            placeholder="Enter your ad account ID"
            value={inputAccountId}
            onChange={(e) => setInputAccountId(e.target.value)}
            className="font-body"
          />
          <Button onClick={handleSave} className="font-body">Save</Button>
        </div>
      </div>
    </div>
  );
}
