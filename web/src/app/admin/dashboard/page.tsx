'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList, Car, } from "lucide-react"
import { useState } from "react"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {

    const [currentJobs, setCurrentJobs] = useState([
        { id: 1, car: 'Toyota Camry', owner: 'Maciej Nowak', status: 'W trakcie', completion: 65 },
        { id: 2, car: 'Honda Civic', owner: 'Tomasz Kowalski', status: 'Oczekujące', completion: 0 },
        { id: 3, car: 'Ford F-150', owner: 'Aneta Jakaś', status: 'Diagnoza', completion: 25 },
      ])
    
      const [recentActivities, setRecentActivities] = useState([
        { id: 1, action: 'Wymiana oleju ukończona', time: '2 godziny temu' },
        { id: 2, action: 'Nowa wizyta umówina', time: '4 godziny temu' },
        { id: 3, action: 'Zamówiono części dla E36', time: 'Wczoraj' },
      ])

    return (
        <div>
            <header className="flex justify-between w-full items-center mb-8">
                <h2 className="text-3xl text-white font-bold">Dashboard</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-zinc-950 border-zinc-900 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ilość Wizyt</CardTitle>
                        <ClipboardList className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">25</div>
                        <p className="text-xs text-muted-foreground">+2 z wczoraj</p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-950 border-zinc-900 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">W Trakcie</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-950 border-zinc-900 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ukończone Dziś</CardTitle>
                        <Car className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">+4 z wczoraj</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-zinc-950 border-zinc-900 text-white">
            <CardHeader>
              <CardTitle>Bieżące Naprawy</CardTitle>
              <CardDescription>Przegląd bieżących napraw</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {currentJobs.map(job => (
                  <li key={job.id} className="bg-zinc-900 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{job.car}</span>
                      <span className="text-sm text-muted-foreground">{job.owner}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">{job.status}</span>
                      <span className="text-sm">{job.completion}%</span>
                    </div>
                    <Progress value={job.completion} className="h-2 bg-zinc-950 " />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="bg-zinc-950 border-zinc-900 text-white">
            <CardHeader>
              <CardTitle>Ostatnie Aktywności</CardTitle>
              <CardDescription>Ostatnie aktualizacje i akcje</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recentActivities.map(activity => (
                  <li key={activity.id} className="bg-zinc-900 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span>{activity.action}</span>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
            </div>
        </div>
    )
}