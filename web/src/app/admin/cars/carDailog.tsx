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
import { validateWithZod } from "@/shared/tools/validation"
import { CarSchema } from "@/shared/schemas/car.schema"

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const { brands, setBrands } = useBrandStore()
  const { models, setModels, brandId, setBrandId } = useModelStore()
  const token = useAuthStore((state) => state.token)

  const fetchModels = async (brandId: string) => {
    if (!token) return

    try {
      const data = await getModelData(token, brandId)
      setModels(data.items)
      if (editedItem) {
        setEditedItem({
          ...editedItem,
          modelId: ""
        })
      }
    } catch (error) {
      console.error("Failed to fetch models:", error)
      setErrors({ form: "Nie udało się pobrać modeli" })
    }
  }



  const handleBrandChange = (brandId: string) => {
    setBrandId(brandId)
    fetchModels(brandId)
  }

  useEffect(() => {

    const fetchBrands = async (token: string) => {
      try {
        const data = await getBrandData(token)
        setBrands(data.items)
      } catch (error) {
        console.error("Failed to fetch brands:", error)
        setErrors({ form: "Nie udało się pobrać marek" })

      }
    }

    if (!isOpen) {
      setErrors({})
    }
    

    if (!brands.length && token) {
      fetchBrands(token)
    }
  }, [isOpen, token, setBrands, brands.length])

  const handleSubmit = async () => {

    if (!token) {
      setErrors({ form: "Nie jesteś zalogowany" })
      return
    }

    if (!editedItem) {
      setErrors({ form: "Brak danych samochodu" })
      return
    }

    const { isValid, errors: validationErrors } = validateWithZod(CarSchema, editedItem)

    if (!isValid) {
      setErrors(validationErrors)
      return
    }

    try {
      if (editedItem.id) {
        await updateCar(token, editedItem)
        setCars(cars.map((c) => (c.id === editedItem.id ? editedItem : c)))
      } else {
        const newCar = await createCar(token, editedItem)
        setCars([...cars, newCar])
      }
      onClose()
      window.location.reload()
    } catch (error) {
      console.error("Failed to save car:", error)
      setErrors({ form: "Nie udało się zapisać samochodu" })
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
            className={errors.registrationNumber ? "border-red-500" : ""}
          />
          {errors.registrationNumber && (
            <p className="text-red-500 text-sm">{errors.registrationNumber}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="vin">VIN</Label>
          <Input
            id="vin"
            value={editedItem?.vin ?? ''}
            onChange={(e) => handleInputChange('vin', e.target.value)}
            className={errors.vin ? "border-red-500" : ""}
          />
          {errors.vin && (
            <p className="text-red-500 text-sm">{errors.vin}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="brand">Marka</Label>
          <Select
            value={brandId ?? undefined}
            onValueChange={handleBrandChange}
          >
            <SelectTrigger className={!brandId ? "border-red-500" : ""}>
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
          {!brandId && !editedItem?.modelId && (
            <p className="text-red-500 text-sm">Marka jest wymagana</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="model">Model</Label>
          <Select
            value={editedItem?.modelId ?? ''}
            onValueChange={(value) => handleInputChange('modelId', value)}
          >
            <SelectTrigger className={errors.modelId ? "border-red-500" : ""}>
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
          {errors.modelId && (
            <p className="text-red-500 text-sm">{errors.modelId}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="fuelType">Rodzaj paliwa</Label>
          <Select
            value={String(editedItem?.fuelType)}
            onValueChange={(value) => handleInputChange('fuelType', parseInt(value))}
          >
            <SelectTrigger className={errors.fuelType ? "border-red-500" : ""}>
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
          {errors.fuelType && (
            <p className="text-red-500 text-sm">{errors.fuelType}</p>
          )}
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
            className={errors.yearOfProduction ? "border-red-500" : ""}
          />
          {errors.yearOfProduction && (
            <p className="text-red-500 text-sm">{errors.yearOfProduction}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="engine">Silnik</Label>
          <Input
            id="engine"
            value={editedItem?.engine ?? ''}
            onChange={(e) => handleInputChange('engine', e.target.value)}
            placeholder="np. 1800"
            className={errors.engine ? "border-red-500" : ""}
          />
          {errors.engine && (
            <p className="text-red-500 text-sm">{errors.engine}</p>
          )}
        </div>

        {errors.form && (
          <div className="text-red-500 text-sm">{errors.form}</div>
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