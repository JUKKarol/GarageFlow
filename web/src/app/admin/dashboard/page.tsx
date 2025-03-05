'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList, Car, } from "lucide-react"
import Header from "@/app/_components/dashboard/header"
import MainContainer from "@/app/_components/dashboard/mainContainer"
import { getAppointments } from "@/modules/appointments/services/appointmentsService"
import { Appointment } from "@/shared/types"
import { useEffect, useState } from "react"
import useAuthStore from "@/shared/stores/authStore"

export default function DashboardPage() {

  const [appoitnemntsCount, setAppointmentsCounts] = useState(0)
  const [yesterdayAppointmentsCount, setYesterdayAppointmentsCount] = useState(0)
  const [inProgressAppointmentsCount, setInProgressAppointmentsCount] = useState(0)
  const [finishedTodayAppointmentsCount, setFinishedTodayAppointmentsCount] = useState(0)
  const [yesterdayFinishedAppointmentsCount, setYesterdayFinishedAppointmentsCount] = useState(0)
  const [errors, setError] = useState<string | null>(null)
  const token = useAuthStore.getState().token
  const isAuthenticated = useAuthStore.getState().isAuthenticated

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!token || !isAuthenticated) {
        return
      }

      try {
        const data = await getAppointments(token)
        console.log(data)
        setAppointmentsCounts(data.itemsCount)
        const yesterdayAppointments = data.items.filter((appointment: Appointment) => {
          return appointment.createdAt ? new Date(appointment.createdAt).getDate() === new Date().getDate() - 1 : false
        }
        )
        setYesterdayAppointmentsCount(yesterdayAppointments.length)
        const inProgressAppointments = data.items.filter((appointment: Appointment) => {
          return appointment.repairHistory?.status === 3
        })
        setInProgressAppointmentsCount(inProgressAppointments.length)
        const finishedTodayAppointments = data.items.filter((appointment: Appointment) => {
          return appointment.repairHistory?.status === 4 && appointment.finishedAt && new Date(appointment.finishedAt).toDateString() === new Date().toDateString()
        })
        setFinishedTodayAppointmentsCount(finishedTodayAppointments.length)
        const yesterdayFinishedAppointments = data.items.filter((appointment: Appointment) => {
          return appointment.repairHistory?.status === 4 && appointment.finishedAt && new Date(appointment.finishedAt).getDate() === new Date().getDate() - 1
        })
        setYesterdayFinishedAppointmentsCount(yesterdayFinishedAppointments.length)
      } catch (error) {
        setError("Fetch appointments error")
        console.error("Fetch appointments error:", error)
      } 
    }

    fetchAppointments()
  }, [token, isAuthenticated])

  return (
        <MainContainer>
          <Header title="Dashboard" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {errors && <div className="text-red-500">{errors}</div>}
                <Card className="bg-zinc-950 border-zinc-900 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ilość Wizyt</CardTitle>
                        <ClipboardList className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{appoitnemntsCount}</div>
                        <p className="text-xs text-muted-foreground">+{yesterdayAppointmentsCount} z wczoraj</p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-950 border-zinc-900 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">W Trakcie</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{inProgressAppointmentsCount}</div>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-950 border-zinc-900 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ukończone Dziś</CardTitle>
                        <Car className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{finishedTodayAppointmentsCount}</div>
                        <p className="text-xs text-muted-foreground">+{yesterdayFinishedAppointmentsCount} z wczoraj</p>
                    </CardContent>
                </Card>
            </div>

           
        </MainContainer>
    )
}