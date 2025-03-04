'use client'

import { Employees } from "@/shared/types"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil } from "lucide-react"
import useUserStore from "@/shared/stores/usersStore"
import { useState, useEffect, use } from "react"
// import { UserDialog } from "./userDialog"
import { getUserData } from "@/modules/users/services/userService"
import useAuthStore from "@/shared/stores/authStore"

export function UsersTable() {
    const { users, setEditedItem, setUsers } = useUserStore()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const token = useAuthStore((state) => state.token)

    const handleEdit = (user: Employees) => {
        setEditedItem(user)
        setIsDialogOpen(true)
    }

    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) return

            try {
                const data = await getUserData(token)
                setUsers(data)
            } catch (error) {
                console.error("Failed to fetch users:", error)
            }
        }

        fetchUsers()
    }, [token, setUsers])


    return (
        <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border border-[#3b3b3b]">
            <Table>
                <TableHeader>
                    <TableRow className="bg-[#1e1e1e] hover:bg-[#1e1e1e] border-[#3b3b3b]">
                        <TableHead className="font-semibold text-white py-3">Imię</TableHead>
                        <TableHead className="font-semibold text-white py-3">Email</TableHead>
                        <TableHead className="font-semibold text-white py-3">Rola</TableHead>
                        <TableHead className="font-semibold text-white py-3">Akcje</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id} className="hover:bg-[#0b0b0b] border-[#3b3b3b]">
                            <TableCell>{user.userName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>Admin</TableCell>
                            <TableCell>
                                    <Pencil className="h-5 w-5 cursor-pointer text-primary hover:text-[#895432]" onClick={() => handleEdit(user)}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </div>
            {/* <UserDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} /> */}
        </div>
    )
}