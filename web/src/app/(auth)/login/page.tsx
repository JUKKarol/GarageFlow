import {AuthCard, AuthInput} from "@/app/_components/auth/auth-card";


export default function LoginPage() {
    return (
        <main className="min-h-screen bg-black flex items-center justify-center">
            <AuthCard title="GarageFlow" description="Zaloguj się do swojego konta aby kontynuować">
                <AuthInput id="email" type="email" placeholder="Email" label="Email" />
                <AuthInput id="password" type="password" placeholder="Hasło" label="Hasło" />
            </AuthCard>
        </main>
    );
}