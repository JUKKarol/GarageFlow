import Header from "@/app/_components/dashboard/header";
import MainContainer from "@/app/_components/dashboard/mainContainer"
import { UsersTable } from "./usersTable"

export default function EmployeesPage() {
    return (
        <MainContainer>
            <Header title="Pracownicy" />
            <UsersTable />
        </MainContainer>
    );
}