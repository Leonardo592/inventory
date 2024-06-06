export function Modal({ children }) {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                {children}
            </div>
        </div>
    );

}