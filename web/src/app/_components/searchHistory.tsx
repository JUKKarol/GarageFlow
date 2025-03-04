'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";

export function SearchHistory() {
    const [vin, setVin] = useState("");
    const router = useRouter();

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (vin.trim()) {
            router.push(`/repair/${vin}`);
        }
    };

    return (
        
        <div className="p-4 max-w-md mx-auto flex flex-wrap gap-5">
            <form onSubmit={handleSearch} className="flex flex-col gap-4">
                <div className="space-y-2 text-white">
                    <Label htmlFor="vin-input">
                        Wyszukaj wszystkie naprawy
                    </Label>
                    <Input
                        className="text-white"
                        id="vin-input"
                        type="text"
                        value={vin}
                        onChange={(e) => setVin(e.target.value)}
                        placeholder="Wprowadź VIN"
                    />
                </div>
                <Button type="submit">
                    Wyszukaj historię
                </Button>
            </form>
            <form onSubmit={handleSearch} className="flex flex-col gap-4">
                <div className="space-y-2 text-white">
                    <Label htmlFor="vin-input">
                        Wyszukaj aktualną naprawę
                    </Label>
                    <Input
                        className="text-white"
                        id="vin-input"
                        type="text"
                        value={vin}
                        onChange={(e) => setVin(e.target.value)}
                        placeholder="Wprowadź VIN"
                    />
                </div>
                <Button type="submit">
                    Wyszukaj naprawę
                </Button>
            </form>
        </div>
    );
}