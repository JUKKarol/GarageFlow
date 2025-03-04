'use client'

import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getUserData, addUserRole, deleteUserRole } from '@/modules/users/services/userService'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { useEffect } from "react"
import { Pencil, X } from "lucide-react"
import { Employees } from "@/shared/types"
import useUserStore from "@/shared/stores/usersStore"
import useAuthStore from "@/shared/stores/authStore"

const ROLE_TYPES = ['Brak', 'Admin', 'Employee', 'Client'] as const
type RoleType = typeof ROLE_TYPES[number]

interface RoleChangeDialogProps {
    isOpen: boolean
    onClose: () => void
    user: Employees | null
}

export function RoleChangeDialog({ isOpen, onClose, user }: RoleChangeDialogProps) {
    const { users, setUsers } = useUserStore()
    const token = useAuthStore((state) => state.token)
    const [selectedRole, setSelectedRole] = useState<RoleType | ''>('')

    const handleRoleChange = async () => {
        if (!user || !selectedRole || !token) {

            return
        }

        try {
            const payload = {
                email: user.email,
                role: selectedRole === 'Brak' ? user.roles[0] : selectedRole
            }

            if (selectedRole === 'Brak') {
                await deleteUserRole(token, payload)
            } else {
                await addUserRole(token, payload)
            }

            const updatedUsers = users.map(u => 
                u.id === user.id 
                    ? {
                        ...u, 
                        roles: selectedRole === 'Brak' 
                            ? [] 
                            : [selectedRole]
                      }
                    : u
            )

            setUsers(updatedUsers)


            onClose()
        } catch (error) {
            console.error('Role change error:', error)
            window.location.reload();
        }
    }

    if (!user) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Zmiana roli dla {user.userName}</DialogTitle>
                    <DialogDescription>
                        Wybierz nową rolę dla użytkownika
                    </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                    <Select 
                        value={selectedRole} 
                        onValueChange={(value: RoleType) => setSelectedRole(value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Wybierz role" />
                        </SelectTrigger>
                        <SelectContent>
                            {ROLE_TYPES.map(role => (
                                <SelectItem key={role} value={role}>
                                    {role}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <div className="flex justify-end space-x-2">
                        <Button 
                            variant="secondary" 
                            onClick={onClose}
                        >
                        Anuluj
                        </Button>
                        <Button 
                            onClick={handleRoleChange}
                            disabled={!selectedRole}
                        >
                        Zapisz
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

// Modify the UsersTable to include the dialog
export function UsersTable() {
    const { users, setUsers } = useUserStore()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<Employees | null>(null)
    const token = useAuthStore((state) => state.token)

    const handleEdit = (user: Employees) => {
        setSelectedUser(user)
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
                                <TableCell>{user.roles.length > 0 ? user.roles[0] : "Brak"}</TableCell>
                                <TableCell>
                                    {user.email !== "admin@example.com" && (
                                        <Pencil 
                                            className="h-5 w-5 cursor-pointer text-primary hover:text-[#895432]" 
                                            onClick={() => handleEdit(user)} 
                                        />
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <RoleChangeDialog 
                isOpen={isDialogOpen} 
                onClose={() => setIsDialogOpen(false)} 
                user={selectedUser} 
            />
        </div>
    )
}