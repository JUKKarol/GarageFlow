'use client'
import { useState, useEffect } from "react";
import { Navbar } from "@/app/_components/navbar";
import { statuses } from "@/shared/statues";
import { searchStatusHistoryService } from "@/modules/search/services/searchService"; // Assuming you have an httpClient setup
import { useRouter, useParams } from "next/navigation";

interface StatusHistoryEntry {
    status: number;
    createdAt: string;
}

interface ApiResponse {
    data: StatusHistoryEntry[] | null;
    status: number;
    success: boolean;
}

const formatDate = (dateString: string): string => {
    if (!dateString) return "Brak daty";
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export default function LastStatusHistoryPage() {
    const [statusHistory, setStatusHistory] = useState<StatusHistoryEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
        const params = useParams();
        const router = useRouter();

    useEffect(() => {
        const fetchStatusHistory = async () => {
            setLoading(true);

            if (!params.vin) {
              setError(true);
              setLoading(false);
              return;
          }
          const vin = Array.isArray(params.vin) ? params.vin[0] : params.vin;


            try {
                const result: ApiResponse = await searchStatusHistoryService.search(vin);

                if (!result.success || result.status !== 200) {
                    setError(true);
                } else {
                    const sortedHistory = (result.data || []).sort((a, b) => 
                        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                    );
                    
                    setStatusHistory(sortedHistory);
                }
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchStatusHistory();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-white">
                <p>Ładowanie...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen text-white">
                <h1 className="text-2xl font-bold mb-4">Nie można załadować historii statusów.</h1>
                <p className="mb-4">Wystąpił błąd podczas pobierania historii statusów.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen w-full bg-black text-white">
            <Navbar />
            <main className="flex flex-col flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Historia statusów naprawy</h1>

                {statusHistory.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-xl">Brak historii statusów dla tej naprawy.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 shadow-md">
                            <div className="space-y-4">
                                {statusHistory.map((entry, index) => {
                                    const statusInfo = statuses.find(s => s.id === entry.status);
                                    return (
                                        <div 
                                            key={index} 
                                            className="flex items-center justify-between"
                                        >
                                            <span 
                                                className={`px-3 py-1 text-sm rounded-full 
                                                    ${statusInfo?.color || 'bg-gray-500'} 
                                                    ${statusInfo?.textColor || 'text-white'}
                                                `}
                                            >
                                                {statusInfo?.name || 'Nieznany status'}
                                            </span>
                                            <span className="text-gray-400">
                                                {formatDate(entry.createdAt)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <footer className="bg-zinc-950 text-gray-400 py-4">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2025 GarageFlow. Wszelkie prawa zastrzeżone.</p>
                </div>
            </footer>
        </div>
    );
}
