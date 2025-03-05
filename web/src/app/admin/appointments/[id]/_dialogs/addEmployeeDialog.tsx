// 'use client'

// import { Check, ChevronsUpDown } from "lucide-react"
// import { cn } from "@/lib/utils";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import useAuthStore from "@/shared/stores/authStore";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Appointment, Employees } from "@/shared/types";
// import { updateAppointment } from "@/modules/appointments/services/appointmentsService";
// import { 
//     Command,
//     CommandEmpty,
//     CommandGroup,
//     CommandInput,
//     CommandItem,
//     CommandList
// } from "@/components/ui/command"
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger
// } from "@/components/ui/popover"
// import useUserStore from "@/shared/stores/usersStore";
// import { getUserData } from "@/modules/users/services/userService";

// interface AddEmployeeDialogProps {
//     appointment: Appointment;
//     isOpen: boolean;
//     onClose: () => void;
// }

// export default function AddEmployeeDialog({ 
//     appointment, 
//     isOpen, 
//     onClose 
// }: AddEmployeeDialogProps) {
//     const [error, setError] = useState<string | null>(null);
//     const router = useRouter();
//     const token = useAuthStore.getState().token;
//     const isAuthenticated = useAuthStore.getState().isAuthenticated;
//     const [editedAppointment, setEditedAppointment] = useState<Appointment>(appointment);
//     const { users, setUsers } = useUserStore();
//     const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | undefined>(
//         Array.isArray(appointment.users) && appointment.users.length > 0 
//             ? appointment.users[0] 
//             : undefined
//     );
//     const [open, setOpen] = useState(false);
//     const [searchTerm] = useState("");

//     useEffect(() => {
//         const fetchUsers = async () => {
//             if (!token || !isAuthenticated) {
//                 router.push('/login');
//                 return;
//             }
    
//             try {
//                 console.log("Fetching user data with token:", token);
//                 const data = await getUserData(token);

//                 console.log("Received user data:", data);
                
//                 //
//                 // if (!data || !data.items) {
//                 //     console.error("Invalid user data structure:", data);
//                 //     setError("Nie można pobrać listy użytkowników");
//                 //     return;
//                 // }

//                 const filteredUsers = data.filter(
//                     (user: Employees) => user.roles.some(role => ['Admin', 'Employee'].includes(role))
//                 );
                
//                 console.log("Filtered users:", filteredUsers);
//                 setUsers(filteredUsers);
//             } catch (error) {
//                 console.error("Fetch users error:", error);
//                 setError("Nie udało się pobrać listy użytkowników. Spróbuj ponownie.");
//             }
//         }

//         if (isOpen) {
//             setEditedAppointment({
//                 ...appointment
//             });
//             setSelectedEmployeeId(
//                 Array.isArray(appointment.users) && appointment.users.length > 0 
//                     ? appointment.users[0] 
//                     : undefined
//             );
//         }

//         if (users.length === 0) {
//             fetchUsers();
//         }
//     }, [isOpen, appointment, users, token, setUsers, isAuthenticated]);

//     const employeeOptions = users?.map((user: { id: string; userName: string;  roles: string[] }) => ({
//         value: user.id,
//         label: `${user.userName} (${user.roles})`
//     })) || [];

//     const filteredEmployeeOptions = employeeOptions.filter((employee: { value: string; label: string }) =>
//         employee.label.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             if (!token || !isAuthenticated) {
//                 router.push('/login');
//                 return;
//             }
            
//             const updatedAppointment = {
//                 ...editedAppointment,
//                 users: selectedEmployeeId ? [selectedEmployeeId] : []
//             };
            
//             await updateAppointment(token, updatedAppointment);

//             onClose();
//             setError(null);
            
//         } catch (error) {
//             console.error("Failed to update appointment:", error);
//             setError("Nie udało się zaktualizować wizyty. Spróbuj ponownie.");
//         } finally {
//         }
//     }

//     return (
//         <Dialog open={isOpen} onOpenChange={onClose}>
//             <DialogContent className="text-white">
//                 <DialogHeader>
//                     <DialogTitle>Przypisz pracownika</DialogTitle>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                     <div className="grid items-center gap-4">
//                         <Popover open={open} onOpenChange={setOpen}>
//                             <PopoverTrigger asChild>
//                                 <Button
//                                     variant="outline"
//                                     role="combobox"
//                                     aria-expanded={open}
//                                     className="w-full justify-between"
//                                 >
//                                     {selectedEmployeeId
//                                         ? employeeOptions.find((employee: { value: string; label: string }) => employee.value === selectedEmployeeId)?.label
//                                         : "Wybierz pracownika..."}
//                                     <ChevronsUpDown className="opacity-50" />
//                                 </Button>
//                             </PopoverTrigger>
//                             <PopoverContent className="w-full p-0">
//                                 <Command>
//                                     <CommandInput
//                                         placeholder="Szukaj pracownika..."
//                                         className="h-9"
//                                     />
//                                     <CommandList>
//                                         {filteredEmployeeOptions.length === 0 ? (
//                                             <CommandEmpty>Nie znaleziono pracownika.</CommandEmpty>
//                                         ) : (
//                                             <CommandGroup>
//                                                 {filteredEmployeeOptions.map((employee: { value: string; label: string }) => (
//                                                     <CommandItem
//                                                         key={employee.value}
//                                                         value={employee.value}
//                                                         onSelect={(currentValue) => {
//                                                             setSelectedEmployeeId(currentValue === selectedEmployeeId ? undefined : currentValue);
//                                                             setEditedAppointment(prev => ({
//                                                                 ...prev,
//                                                                 employeeId: currentValue
//                                                             }));
//                                                             setOpen(false);
//                                                         }}
//                                                     >
//                                                         {employee.label}
//                                                         <Check
//                                                             className={cn(
//                                                                 "ml-auto",
//                                                                 selectedEmployeeId === employee.value ? "opacity-100" : "opacity-0"
//                                                             )}
//                                                         />
//                                                     </CommandItem>
//                                                 ))}
//                                             </CommandGroup>
//                                         )}
//                                     </CommandList>
//                                 </Command>
//                             </PopoverContent>
//                         </Popover>

//                         {error && (
//                             <p className="text-red-500">{error}</p>
//                         )}
//                     </div>
//                 </div>
//                 <div className="flex justify-end space-x-2">
//                     <Button
//                         variant="secondary"
//                         onClick={onClose}
//                     >
//                         Anuluj
//                     </Button>
//                     <Button onClick={handleSubmit}>
//                         Przypisz pracownika
//                     </Button>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     )
// }