import Header from "@/app/_components/dashboard/header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const employees = [
    { id: 1, name: "John Doe", email: "john@example.com", department: "Engineering", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", department: "Marketing", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", department: "Sales", status: "On Leave" },
    { id: 4, name: "Alice Williams", email: "alice@example.com", department: "Human Resources", status: "Active" },
]


export default function EmployeesPage() {
    return (
        <div className="text-white">
            <Header title="Pracownicy" />
            <div>
                <div className="overflow-hidden rounded-lg border border-zinc-200">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-zinc-950 hover:bg-transparent">
                                <TableHead className="font-semibold text-white py-3">Name</TableHead>
                                <TableHead className="font-semibold text-white py-3">Email</TableHead>
                                <TableHead className="font-semibold text-white py-3">Department</TableHead>
                                <TableHead className="font-semibold text-white py-3">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {employees.map((employee, index) => (
                                <TableRow
                                    key={employee.id}
                                    className={`${index % 2 === 0 ? 'bg-zinc-950' : 'bg-zinc-900'
                                        } hover:bg-zinc-800`}
                                >                                    <TableCell className="py-3">{employee.name}</TableCell>
                                    <TableCell className="py-3">{employee.email}</TableCell>
                                    <TableCell className="py-3">{employee.department}</TableCell>
                                    <TableCell className="py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {employee.status}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}