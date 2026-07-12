import { Link } from "react-router-dom";
import { useState } from "react";

function Header () {
    const [menuAbierto, setMenuAbierto] = useState(false);

    return (
        <header className="bg-green-900 shadow-md">
            <nav className="flex justify-between items-center p-4">
                <Link to="/">
                    <img src="logo.png" alt="Logo" className="w-12 h-12"/>
                </Link>
                <div className="hidden md:flex items-center gap-4">
                    <Link to="/" className="text-gray-100 hover:text-gray-200">Inicio</Link>
                    <Link to="#" className="text-gray-100 hover:text-gray-200">Nosotros</Link>
                    <Link to="#" className="text-gray-100 hover:text-gray-200">Contacto</Link>
                </div>
                <button className="md:hidden p-2 rounded-md border border-gray-200" onClick={() => setMenuAbierto(!menuAbierto)}>
                    <span className="text-gray-100 text-xl">☰</span>
                </button>
            </nav>
            <div className={`${menuAbierto ? 'block' : 'hidden'} md:hidden bg-green-900 shadow-md px-4 py-3`}>
                <Link to="/" className="block text-gray-100 hover:text-gray-200 py-2">Inicio</Link>
                <Link to="#" className="block text-gray-100 hover:text-gray-200 py-2">Nosotros</Link>
                <Link to="#" className="block text-gray-100 hover:text-gray-200 py-2">Contacto</Link>
            </div>
        </header>
    )
}

export default Header