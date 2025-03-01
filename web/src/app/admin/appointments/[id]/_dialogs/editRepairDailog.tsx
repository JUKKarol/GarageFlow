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
import { validateWithZod } from "@/shared/tools/validation"
import { AppointmentSchema } from "@/shared/schemas/appointment.schema"

const appointmentFormSchema = AppointmentSchema.refine(
  (data: Appointment) => new Date(data.plannedFinishAt) >= new Date(data.plannedStartAt),
  {
    message: "Data zakończenia musi być późniejsza lub równa dacie rozpoczęcia",
    path: ["plannedFinishAt"],
  }
)


interface EditAppointmentDialogProps {
  appointment: Appointment
}


export function EditAppointmentDialog({ appointment }: EditAppointmentDialogProps) {
  const [open, setOpen] = useState(false)
  const [editedAppointment, setEditedAppointment] = useState<Appointment>(appointment)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const { setAppointment } = useAppointmentStore()
  const token = useAuthStore.getState().token || "";
  const isAuthenticated = useAuthStore.getState().isAuthenticated;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedAppointment((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      const updatedErrors = { ...errors }
      delete updatedErrors[name]
      setErrors(updatedErrors)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setAppointment(editedAppointment)

      if (!token || !isAuthenticated) {
        setErrors({ form: "Nie jesteś zalogowany" })
        return
      }
      if (!editedAppointment.carId) {
        delete editedAppointment.carId
      }

      const { isValid, errors: validationErrors } = validateWithZod(appointmentFormSchema, editedAppointment)

      if (!isValid) {
        setErrors(validationErrors)
        return
      }

      await updateAppointment(token, editedAppointment)

      setOpen(false)
      window.location.reload()
    } catch (error) {
      console.error("Failed to update appointment:", error)
      setErrors({ form: "Nie udało się zapisać wizyty" })
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
              className={errors.customerName ? "border-red-500" : ""}
            />
            {errors.customerName && (
              <p className="text-sm text-red-500">{errors.customerName}</p>
            )}
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
              className={errors.customerPhoneNumber ? "border-red-500" : ""}
            />
            {errors.customerPhoneNumber && (
              <p className="text-sm text-red-500">{errors.customerPhoneNumber}</p>
            )}
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
              className={errors.customerEmail ? "border-red-500" : ""}
            />
            {errors.customerEmail && (
              <p className="text-sm text-red-500">{errors.customerEmail}</p>
            )}
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
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
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
              className={errors.plannedStartAt ? "border-red-500" : ""}
            />
            {errors.plannedStartAt && (
              <p className="text-sm text-red-500">{errors.plannedStartAt}</p>
            )}
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
              className={errors.plannedFinishAt ? "border-red-500" : ""}
            />
            {errors.plannedFinishAt && (
              <p className="text-sm text-red-500">{errors.plannedFinishAt}</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Zapisz zmiany
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

