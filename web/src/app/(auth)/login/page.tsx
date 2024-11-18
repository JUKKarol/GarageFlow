import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
export default function LoginPage() {
    return (
        <main className="min-h-screen bg-black flex items-center justify-center">
            <Card className="w-full text-white max-w-md bg-zinc-950 border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">GarageFlow</CardTitle>
                    <CardDescription className="text-center">Zaloguj się aby kontynuować</CardDescription>
                </CardHeader>
                <form>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                            id="email"
                            type="email"
                            placeholder="Wprowadź swój email"
                            required                            
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Hasło</Label>
                            <Input 
                            id="password"
                            type="password"
                            placeholder="Wprowadź swoje hasło"
                            required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="remember-me" className="border-white">Zapamiętaj mnie</Checkbox>
                                <Label htmlFor="remember">Remember me</Label>
                            </div>
                            <a href="#" className="text-blue-400 hover:underline">Zapomniałeś hasła?</a>
                        </div>
                    </CardContent>
                    <CardFooter>
                            <Button className="w-full font-medium bg-blue-700 hover:bg-blue-800" type="submit">Zaloguj się</Button>
                    </CardFooter>
                </form>
            </Card>
        </main>
    );
}