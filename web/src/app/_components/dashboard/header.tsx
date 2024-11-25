interface HeaderProps {
    title: string;
}

function Header({ title }: HeaderProps) {
    return (
        <header className="flex justify-between w-full items-center mb-8">
            <h2 className="text-3xl text-white font-bold">{title}</h2>
        </header>
    );
}

export default Header;
