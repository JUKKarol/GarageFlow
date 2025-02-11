"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAppointmentStore } from "@/shared/stores/appointmentsStore"
import type { Appointment } from "@/shared/types"
import { Edit } from "lucide-react"
import { updateAppointment } from "@/modules/appointments/services/appointmentsService"
import useAuthStore from "@/shared/stores/authStore"
import { statuses } from "@/shared/statues"


interface EditAppointmentDialogProps {
  appointment: Appointment
}

const token = useAuthStore.getState().token || "";
const isAuthenticated = useAuthStore.getState().isAuthenticated;

export function EditAppointmentDialog({ appointment }: EditAppointmentDialogProps) {
  const [open, setOpen] = useState(false)
  const [editedAppointment, setEditedAppointment] = useState<Appointment>(appointment)
  const { setAppointment } = useAppointmentStore()
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedAppointment((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setAppointment(editedAppointment)

        if (!token || !isAuthenticated) {
            router.push('/login')
            return
        }
        if(!editedAppointment.carId) {
            delete editedAppointment.carId
        }
        await updateAppointment(token, editedAppointment)

      setOpen(false)
      router.refresh() 
    } catch (error) {
      console.error("Failed to update appointment:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Edit />
          Edytuj wizytę
        </Button>
      </DialogTrigger>
      <DialogContent className="text-white bg-zinc-950">
        <DialogHeader>
          <DialogTitle>Edytuj wizytę</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="customerName" className="text-sm font-medium">
              Imię i nazwisko klienta
            </label>
            <Input
              id="customerName"
              name="customerName"
              value={editedAppointment.customerName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="customerPhoneNumber" className="text-sm font-medium">
              Numer telefonu
            </label>
            <Input
              id="customerPhoneNumber"
              name="customerPhoneNumber"
              value={editedAppointment.customerPhoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="customerEmail" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="customerEmail"
              name="customerEmail"
              type="email"
              value={editedAppointment.customerEmail}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="description" className="text-sm font-medium">
              Opis
            </label>
            <Textarea
              id="description"
              name="description"
              value={editedAppointment.description}
              onChange={handleInputChange}
            />
          </div>
            <div>
                <label htmlFor="plannedStartAt" className="text-sm font-medium">
                    Termin wizyty
                </label>
                <Input
                    id="plannedStartAt"
                    name="plannedStartAt"
                    type="date"
                    value={editedAppointment.plannedStartAt}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="plannedFinishAt" className="text-sm font-medium">
                    Planowany koniec wizyty
                </label>
                <Input
                    id="plannedFinishAt"
                    name="plannedFinishAt"
                    type="date"
                    value={editedAppointment.plannedFinishAt}
                    onChange={handleInputChange}
                />
            </div>
          <Button type="submit" className="w-full">
            Zapisz zmiany
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

