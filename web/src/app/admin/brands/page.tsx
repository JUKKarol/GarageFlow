'use client'

import { useEffect } from "react";
import Header from "@/app/_components/dashboard/header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import useBrandStore from "@/shared/stores/brandStore";
import { getBrandData } from "@/modules/brands/services/brandService";
import useAuthStore from "@/shared/stores/authStore";

export default function BrandsPage() {
    const token = useAuthStore((state) => state.token);
    const { brands, setBrands } = useBrandStore();

    useEffect(() => {
        const fetchBrands = async () => {
          if (token) {
            try {
              const data = await getBrandData(token);
              setBrands(data.items); 
            } catch (error) {
              console.error("Failed to fetch brands:", error);
            }
          }
        };
    
        fetchBrands();
      }, [token, setBrands]);



    return (
        <div className="text-white">
            <div className="flex justify-between">
            <Header title="Marki" />
                <Button className="mb-4 bg-blue-600 hover:bg-blue-700">Dodaj</Button>
            </div>
            <div>
                <div className="overflow-hidden rounded-lg border border-zinc-200">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-zinc-950 hover:bg-transparent">
                                <TableHead className="font-semibold text-white py-3">Name</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {brands.map((brand) => (
                                <TableRow key={brand.id} className="hover:bg-zinc-950">
                                    <TableCell>{brand.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}