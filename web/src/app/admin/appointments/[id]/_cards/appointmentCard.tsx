import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

interface AppointmentCardTitleProps {
    title: string;
    icon: LucideIcon;
}

interface AppointmentCardProps {
    title: string;
    icon: LucideIcon;
    children: React.ReactNode;
}

function AppointmentCardHeader({ title, icon: Icon }: AppointmentCardTitleProps) {
    return (
        <CardHeader>
            <CardTitle className="flex items-center text-lg">
                <Icon className="w-5 h-5 mr-2" />
                {title}
            </CardTitle>
        </CardHeader>
    );
}

export default function AppointmentCard({ title, icon, children }: AppointmentCardProps) {
    return (
        <Card className="text-white bg-foreground border-[#3b3b3b]">
            <AppointmentCardHeader title={title} icon={icon} />
            <CardContent className="space-y-2">
                {children}
            </CardContent>
        </Card>
    );
}
