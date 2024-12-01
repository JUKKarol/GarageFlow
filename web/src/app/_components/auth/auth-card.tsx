import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AuthInputProps {
    id: string;
    type: string;
    placeholder: string;
    label: string;
}

interface AuthCardProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

function AuthInput({ id, type, placeholder, label }: AuthInputProps) {
    return (
        <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Input 
        id={id}
        type={type}
        placeholder={placeholder}
        />
    </div>
    );
}

function AuthCard({ title, description, children }: AuthCardProps): JSX.Element {
    return (
        <Card className="w-full text-white max-w-md bg-zinc-950 border-zinc-800">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
                <CardDescription className="text-center">{description}</CardDescription>
            </CardHeader>
            <form>
                <CardContent className="space-y-4">
                    {children}
                </CardContent>
                <CardFooter>
                    <Button className="w-full font-medium bg-blue-700 hover:bg-blue-800" type="submit">Zaloguj się</Button>
                </CardFooter>
            </form>
        </Card>
    );
}

export {AuthCard, AuthInput};