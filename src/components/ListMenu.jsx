import { useAuth } from '../context/AuthContext';
import { DesplegableUser } from '../utils/dataEstatica'
import { useState } from 'react';

export function ListMenu({ funcion }) {

    const { user } = useAuth()
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button onClick={handleMenuToggle} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
                {user.email}
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    {DesplegableUser.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                funcion(item);
                                setIsOpen(false);
                            }}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                        >
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

}