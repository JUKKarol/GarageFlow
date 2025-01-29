import MainContainer from "@/app/_components/dashboard/mainContainer";
import Header from "@/app/_components/dashboard/header";
import { CarTable } from "./carsTable";

export default function CarsPage() {
    return (
    <MainContainer>
        <Header title="Flota Klientów" />
        <CarTable />
    </MainContainer>
    );
}