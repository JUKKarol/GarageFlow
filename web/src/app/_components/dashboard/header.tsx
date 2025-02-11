interface HeaderProps {
    title: string;
    children?: React.ReactNode;
}

function Header({ title, children }: HeaderProps) {
    return (
        <header className="flex justify-between w-full items-center mb-6">
            <h2 className="text-3xl text-white font-bold">{title}</h2>
            {children}
        </header>
    );
}

export default Header;
