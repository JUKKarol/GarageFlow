'use client'
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useCarStore from "@/shared/stores/carsStore"
import { Car } from "@/shared/types"
import { FuelTypes } from "@/shared/fuel-types"
import useBrandStore from "@/shared/stores/brandStore"
import useModelStore from "@/shared/stores/modelStore"
import { getBrandData } from "@/modules/brands/services/brandService"
import { getModelData } from "@/modules/models/services/modelService"
import useAuthStore from "@/shared/stores/authStore"
import { createCar, updateCar } from "@/modules/cars/services/carService"
import { useRouter } from "next/navigation"


interface CarDialogProps {
  car?: Car | null
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
  const { editedItem, setEditedItem, cars, setCars } = useCarStore()
  const [error, setError] = useState<string | null>(null)
  const { brands, setBrands } = useBrandStore()
  const { models, setModels, brandId, setBrandId } = useModelStore()
  const token = useAuthStore((state) => state.token)
  const router = useRouter();

  const fetchModels = async (brandId: string) => {
    if (!token) return

    try {
      const data = await getModelData(token, brandId)
      setModels(data.items)
      // Reset modelId when brand changes
      if (editedItem) {
        setEditedItem({
          ...editedItem,
          modelId: ""
        })
      }
    } catch (error) {
      console.error("Failed to fetch models:", error)
    }
  }

  const fetchBrands = async (token: string) => {
    try {
      const data = await getBrandData(token)
      setBrands(data.items)
    } catch (error) {
      console.error("Failed to fetch brands:", error)
    }
  }

  const handleBrandChange = (brandId: string) => {
    setBrandId(brandId)
    fetchModels(brandId)
  }

  useEffect(() => {
    if (!isOpen) {
      setError(null)
    }
    

    if (!brands.length && token) {
      fetchBrands(token)
    }
  }, [isOpen, token, setBrands, brands.length])

  const handleSubmit = async () => {
    try {
      if (!editedItem?.registrationNumber || !editedItem?.engine || !editedItem?.modelId) {
        setError("Wypełnij wszystkie wymagane pola")
        return
      }

      if (editedItem.yearOfProduction < 1900 || editedItem.yearOfProduction > new Date().getFullYear()) {
        setError("Nieprawidłowy rok produkcji")
        return
      }

      if (token){

        if (editedItem.id) {
          await updateCar(token, editedItem)
          setCars(cars.map((c) => (c.id === editedItem.id ? editedItem : c)))
        } else {

        const newCar = await createCar(token, editedItem)
        setCars([...cars, newCar])
        }
      }
      onClose()

    } catch (error) {
      console.error("Failed to save car:", error)
      setError("Nie udało się zapisać samochodu")
    }
    router.refresh()
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
            <Label htmlFor="brand">Marka</Label>
            <Select
              value={brandId ?? undefined}
              onValueChange={handleBrandChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Wybierz markę" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="model">Model</Label>
            <Select
              value={editedItem?.modelId ?? ''}
              onValueChange={(value) => handleInputChange('modelId', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Wybierz model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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