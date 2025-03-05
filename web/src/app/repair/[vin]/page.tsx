'use client'
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { searchRepairsService } from "@/modules/search/services/searchService";
import { Navbar } from "@/app/_components/navbar";
import { useRepairsStore } from "@/shared/stores/searchRepairStore";
import { RepairDetails } from "@/shared/types";
import { statuses } from "@/shared/statues";
import { SearchRepair } from "@/shared/types";

const formatDate = (dateString: string): string => {
    if (!dateString) return "Brak daty";
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export default function HistoryPage() {
    const params = useParams();
    const router = useRouter();

    const {
        loading,
        error,
        setLoading,
        setError,
        setRepairs,
        getRepairsByDate
    } = useRepairsStore();

    const sortedRepairs = getRepairsByDate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            if (!params.vin) {
                setError(true);
                setLoading(false);
                return;
            }

            const vin = Array.isArray(params.vin) ? params.vin[0] : params.vin;
            const result = await searchRepairsService.search(vin);

            if (!result.success || result.status !== 200) {
                setError(true);
            } else {
                setRepairs(result.data);
            }

            setLoading(false);
        };

        fetchData();
    }, [params.vin, setLoading, setError, setRepairs]);

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
                <h1 className="text-2xl font-bold mb-4">Nie znaleziono historii pojazdu.</h1>
                <p className="mb-4">Nie mogliśmy znaleźć historii do podanego numeru VIN.</p>
                <button
                    onClick={() => router.push('/')}
                    className="px-4 py-2 bg-primary text-white rounded"
                >
                    Wróć do strony głównej
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen w-full bg-black text-white">
            <Navbar />
            <main className="flex flex-col flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Historia napraw</h1>

                {sortedRepairs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-xl">Brak historii napraw dla tego pojazdu.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {sortedRepairs.map((repair: SearchRepair, index: number) => (
                            <div
                                key={index}
                                className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 shadow-md"
                            >
                                <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                                    <div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-400">
                                            <p>Zaplanowany start: {formatDate(repair.plannedStartAt)}</p>
                                            <p>Zaplanowane zakończenie: {formatDate(repair.plannedFinishAt)}</p>
                                            {repair.finishedAt !== '0001-01-01' && <p>Zakończono: {formatDate(repair.finishedAt)}</p>}
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        {repair.repairHistory?.status !== undefined && (
                                            <span className={`px-3 py-1 text-sm rounded-full ${statuses.find(status => status.id === repair.repairHistory.status)?.color || 'bg-gray-500'
                                                } ${statuses.find(status => status.id === repair.repairHistory.status)?.textColor || 'text-white'
                                                }`}>
                                                {statuses.find(status => status.id === repair.repairHistory.status)?.name || 'Nieznany status'}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <p className="mb-4">{repair.description}</p>
                                {repair.repairDetails && repair.repairDetails.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Wykonane usługi:</h3>
                                        <ul className="space-y-2">
                                            {repair.repairDetails
                                                .filter((detail: { repairDetailType: number; }) => detail.repairDetailType === 1)
                                                .map((detail: RepairDetails) => (
                                                    <li key={detail.id} className="flex justify-between">
                                                        <span>{detail.name}</span>
                                                        <span>{detail.price.toFixed(2)} zł</span>
                                                    </li>
                                                ))}
                                        </ul>

                                        <h3 className="text-lg font-medium mt-4 mb-2">Wymienione części:</h3>
                                        <ul className="space-y-2">
                                            {repair.repairDetails
                                                .filter((detail: { repairDetailType: number; }) => detail.repairDetailType === 2)
                                                .map((detail: RepairDetails) => (
                                                    <li key={detail.id} className="flex justify-between">
                                                        <span>{detail.name}</span>
                                                        <span>{detail.price.toFixed(2)} zł</span>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                )}


                                <div className="mt-4 text-xs text-gray-500">
                                    <p>Utworzono: {formatDate(repair.createdAt)}</p>
                                    <p>Ostatnia aktualizacja: {formatDate(repair.updatedAt)}</p>
                                </div>
                            </div>
                        ))}
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