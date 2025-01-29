'use client'

import { Car } from "@/shared/types"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2 } from "lucide-react"
import useCarStore from "@/shared/stores/carsStore"
import { useState } from "react"
import { CarDialog } from "./carDailog"
import { FuelTypes } from "@/shared/fuel-types" 

export function CarTable() {
  const { cars, setEditedItem, removeCar } = useCarStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleEdit = (car: Car) => {
    setEditedItem(car)
    setIsDialogOpen(true)
  }



  const getFuelTypeName = (fuelTypeId: number) => {
    return FuelTypes.find(type => type.id === fuelTypeId)?.name || 'Nieznany'
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Samochody</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          Dodaj samochód
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rejestracja</TableHead>
            <TableHead>VIN</TableHead>
            <TableHead>Paliwo</TableHead>
            <TableHead>Rocznik</TableHead>
            <TableHead>Silnik</TableHead>
            <TableHead className="text-right">Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars.map((car) => (
            <TableRow key={car.id}>
              <TableCell>{car.registrationNumber}</TableCell>
              <TableCell>{car.vin}</TableCell>
              <TableCell>{getFuelTypeName(car.fuelType)}</TableCell>
              <TableCell>{car.yearOfProduction}</TableCell>
              <TableCell>{car.engine} cm3</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(car)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CarDialog 
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false)
          setEditedItem(null)
        }}
      />
    </div>
  )
}