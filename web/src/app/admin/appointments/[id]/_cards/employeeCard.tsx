// import { Car } from "lucide-react";
// import AppointmentCard from "./appointmentCard";
// import { Appointment } from "@/shared/types";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";
// import useAuthStore from "@/shared/stores/authStore";
// import AddEmployeeDialog from "../_dialogs/addEmployeeDialog";

// interface CarCardProps {
//     appointment: Appointment;
// }

// export default function EmployeeCard({ appointment }: CarCardProps) {
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const { token, isAuthenticated } = useAuthStore.getState();
//     // const { car, setCar } = useCarStore();


//     // useEffect(() => {
//     //     const fetchCar = async () => {
//     //         if (!token || !isAuthenticated) {
//     //             return;
//     //         }
    
//     //         try {
//     //             // const data = await getCar(token, u);
//     //             // setCar(data.items[0]);
    
//     //         } catch {
//     //             console.log("Fetch car error");
//     //         }
//     //     }

//     //     if (carId) {
//     //         fetchCar();
//     //     }
//     // }, [token, isAuthenticated, carId, setCar]);

//     return (
//         <AppointmentCard title="Informacje o pojeździe" icon={Car}>
//             {appointment.users && appointment.users.length > 0 ? (
//                 <div className="w-full">
//                     {/* <div className="flex gap-4 w-full">
//                         <p className="font-semibold">Rok produkcji</p>
//                         <p>{car.yearOfProduction} cm3</p>
//                     </div> */}
//                 </div>
//             ) : (
//                 <div className="flex justify-center items-center w-full">
//                     <Button onClick={() => setIsDialogOpen(true)}>
//                         <Plus className="mr-2 h-4 w-4" /> Dodaj pracownika
//                     </Button>
//                     <AddEmployeeDialog 
//                         appointment={appointment} 
//                         isOpen={isDialogOpen} 
//                         onClose={() => setIsDialogOpen(false)} 
//                     />
//                 </div>
//             )}
//         </AppointmentCard>
//     )
// }