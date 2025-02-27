import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useCarStore from "@/shared/stores/carsStore";
import useAuthStore from "@/shared/stores/authStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Appointment } from "@/shared/types";
import { updateAppointment } from "@/modules/appointments/services/appointmentsService";
import { getCarData } from "@/modules/cars/services/carService";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"

interface AddCarDialogProps {
    appointment: Appointment;
    isOpen: boolean;
    onClose: () => void;
}

export default function AddCarDialog({ appointment, isOpen, onClose }: AddCarDialogProps) {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const token = useAuthStore.getState().token;
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    const [editedAppointment, setEditedAppointment] = useState<Appointment>(appointment)
    const { cars, setCars } = useCarStore();
    const [selectedCarId, setSelectedCarId] = useState<string | undefined>(
        appointment.carId ? appointment.carId.toString() : undefined
    );
    const [open, setOpen] = useState(false);
    const [searchTerm] = useState("");


    useEffect(() => {

        const fetchCars = async () => {
            if (!token || !isAuthenticated) {
                router.push('/login');
                return;
            }
    
            try {
                const data = await getCarData(token);
                setCars(data.items);
            } catch (error) {
                console.log("Fetch cars error:", error);
            }
        }

        if (isOpen) {
            setEditedAppointment({
                ...appointment
            });
            setSelectedCarId(appointment.carId ? appointment.carId : undefined);
        }

        if (cars.length === 0) {
            fetchCars();
        }
    }, [isOpen, setEditedAppointment, appointment, cars, token, setCars]);

    const carOptions = cars?.map((car) => ({
        value: car.id,
        label: `${car.registrationNumber}`
    }));

    const filteredCarOptions = carOptions.filter(car =>
        car.label.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!token || !isAuthenticated) {
                router.push('/login');
                return;
            }
            if (!editedAppointment.carId) {
                delete editedAppointment.carId;
            }
            await updateAppointment(token, editedAppointment);

            onClose();
            setError(null);
            
        } catch (error) {
            console.error("Failed to update appointment:", error);
            setError("Failed to update appointment. Try again.");
        } finally {
            window.location.reload();
        }
    }

    return (
        
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="text-white">
                <DialogHeader>
                    <DialogTitle>Przypisz auto</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full justify-between"
                                >
                                    {selectedCarId
                                        ? carOptions.find((car) => car.value === selectedCarId)?.label
                                        : "Wybierz samochód..."}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput
                                        placeholder="Szukaj samochodu..."
                                        className="h-9"
                                        />
                                    <CommandList>
                                        {filteredCarOptions.length === 0 ? (
                                            <CommandEmpty>Nie znaleziono samochodu.</CommandEmpty>
                                        ) : (
                                            <CommandGroup>
                                                {filteredCarOptions.map((car) => (
                                                    <CommandItem
                                                        key={car.value}
                                                        value={car.value}
                                                        onSelect={(currentValue) => {
                                                            setSelectedCarId(currentValue === selectedCarId ? undefined : currentValue);
                                                            setEditedAppointment(prev => ({
                                                                ...prev,
                                                                carId: currentValue
                                                            }));
                                                            setOpen(false);
                                                        }}
                                                    >
                                                        {car.label}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto",
                                                                selectedCarId === car.value ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        )}
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>

                        {error && (
                            <p className="text-red-500">{error}</p>
                        )}
                    </div>
                </div>
                <div className="flex justify-end space-x-2">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                    >
                        Anuluj
                    </Button>
                    <Button onClick={handleSubmit}>
                        Dodaj wizytę
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}