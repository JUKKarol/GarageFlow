'use client'

import { Car } from "@/shared/types"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil } from "lucide-react"
import useCarStore from "@/shared/stores/carsStore"
import { useState, useEffect } from "react"
import { CarDialog } from "./carDailog"
import { FuelTypes } from "@/shared/fuel-types"
import { getCarData } from "@/modules/cars/services/carService"
import useAuthStore from "@/shared/stores/authStore"


export function CarTable() {
  const { cars, setEditedItem, setCars } = useCarStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const token = useAuthStore((state) => state.token)

  const handleEdit = (car: Car) => {
    setEditedItem(car)
    setIsDialogOpen(true)
  }

  const handleAdd = () => {
    setEditedItem(null)
    setIsDialogOpen(true)
  }



  useEffect(() => {
    const fetchCars = async () => {
      if (!token) return
  
      try {
        const data = await getCarData(token)
        setCars(data.items)
      } catch (error) {
        console.error("Failed to fetch cars:", error)
      }
    }

    fetchCars()
  }, [token, setCars])




  const getFuelTypeName = (fuelTypeId: number) => {
    return FuelTypes.find(type => type.id === fuelTypeId)?.name || 'Nieznany'
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Samochody</h2>
        <Button onClick={handleAdd}>
          Dodaj samochód
        </Button>
      </div>
      <div className="overflow-hidden rounded-lg border border-[#3b3b3b]">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#1e1e1e] hover:bg-[#1e1e1e] border-[#3b3b3b]">
              <TableHead className="font-semibold text-white py-3">Rejestracja</TableHead>
              <TableHead className="font-semibold text-white py-3">VIN</TableHead>
              <TableHead className="font-semibold text-white py-3">Paliwo</TableHead>
              <TableHead className="font-semibold text-white py-3">Rocznik</TableHead>
              <TableHead className="font-semibold text-white py-3">Silnik</TableHead>
              <TableHead className="font-semibold text-white py-3">Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car.id} className="hover:bg-[#0b0b0b] border-[#3b3b3b]">
                <TableCell>{car.registrationNumber}</TableCell>
                <TableCell>{car.vin}</TableCell>
                <TableCell>{getFuelTypeName(car.fuelType)}</TableCell>
                <TableCell>{car.yearOfProduction}</TableCell>
                <TableCell>{car.engine} cm3</TableCell>
                <TableCell>
                  <Pencil className="h-5 w-5 cursor-pointer text-primary hover:text-[#895432]"
                    onClick={() => handleEdit(car)} />
                    
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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