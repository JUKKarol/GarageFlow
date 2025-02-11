export default function MainContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="text-white p-4 space-y-6">
            {children}
        </div>
    );
}