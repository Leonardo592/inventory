export function CardDatosEmpresa({ titulo, valor }) {

  return (
    <div className="bg-white text-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">{titulo}</h3>
      <p className="text-xl font-bold">{valor}</p>
    </div>
  );

}