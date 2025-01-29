import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useCarStore from "@/shared/stores/carsStore"
import { Car } from "@/shared/types"
import { FuelTypes } from "@/shared/fuel-types"

interface CarDialogProps {
  isOpen: boolean
  onClose: () => void
}

const INITIAL_CAR: Omit<Car, 'id'> = {
  fuelType: FuelTypes[0].id,
  registrationNumber: "",
  vin: "",
  modelId: "",
  yearOfProduction: new Date().getFullYear(),
  engine: ""
}

export function CarDialog({ isOpen, onClose }: CarDialogProps) {
  const { editedItem, setEditedItem, addCar } = useCarStore()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) {
      setError(null)
    }
  }, [isOpen])

  const handleSubmit = async () => {
    try {
      if (!editedItem?.registrationNumber || !editedItem?.engine) {
        setError("Wypełnij wszystkie wymagane pola")
        return
      }

      if (editedItem.yearOfProduction < 1900 || editedItem.yearOfProduction > new Date().getFullYear()) {
        setError("Nieprawidłowy rok produkcji")
        return
      }

      await addCar(editedItem)
      onClose()
    } catch (error) {
      console.error("Failed to save car:", error)
      setError("Nie udało się zapisać samochodu")
    }
  }

  const handleInputChange = (
    field: keyof Omit<Car, 'id'>,
    value: string | number
  ) => {
    if (!editedItem) return

    setEditedItem({
      ...editedItem,
      [field]: field === 'yearOfProduction' || field === 'fuelType' 
        ? Number(value) 
        : value
    })
  }

  useEffect(() => {
    if (isOpen && !editedItem) {
      setEditedItem({ ...INITIAL_CAR, id: '' })
    }
  }, [isOpen, editedItem, setEditedItem])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] text-white bg-zinc-950">
        <DialogHeader>
          <DialogTitle>
            {editedItem?.id ? 'Edytuj samochód' : 'Dodaj nowy samochód'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="registrationNumber">Nr. rejestracyjny</Label>
            <Input
              id="registrationNumber"
              value={editedItem?.registrationNumber ?? ''}
              onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="vin">VIN</Label>
            <Input
              id="vin"
              value={editedItem?.vin ?? ''}
              onChange={(e) => handleInputChange('vin', e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="fuelType">Rodzaj paliwa</Label>
            <Select
              value={String(editedItem?.fuelType)}
              onValueChange={(value) => handleInputChange('fuelType', parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Wybierz rodzaj paliwa" />
              </SelectTrigger>
              <SelectContent>
                {FuelTypes.map((type) => (
                  <SelectItem key={type.id} value={String(type.id)}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="yearOfProduction">Rok produkcji</Label>
            <Input
              id="yearOfProduction"
              type="number"
              min={1900}
              max={new Date().getFullYear()}
              value={editedItem?.yearOfProduction ?? ''}
              onChange={(e) => handleInputChange('yearOfProduction', e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="engine">Silnik</Label>
            <Input
              id="engine"
              value={editedItem?.engine ?? ''}
              onChange={(e) => handleInputChange('engine', e.target.value)}
              placeholder="np. 1800"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={onClose}>
              Anuluj
            </Button>
            <Button onClick={handleSubmit}>
              {editedItem?.id ? 'Zapisz' : 'Dodaj'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}