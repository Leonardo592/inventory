import { useAuthStore } from "../store/AuthStore";
import { ListMenu } from "../components/ListMenu";
import { Sidebar } from "../components/Sidebar";
import { CardDatosEmpresa } from "../components/CardDatosEmpresa";
import { useQuery } from "@tanstack/react-query";
import { useEmpresaStore } from '../store/EmpresaStore'
import { BannerEmpresa } from "../components/BannerEmpresa";
import { useAutoAnimate } from '@formkit/auto-animate/react';

export function HomePage() {

  const { signOut } = useAuthStore()

  const { contarUsuariosPorEmpresa, dataempresa } = useEmpresaStore()

  const { data, isLoading } = useQuery({
    queryKey: ["contarUsuariosPorEmpresa"],
    queryFn: () => contarUsuariosPorEmpresa({ id_empresa: dataempresa.empresa.id }),
    enabled: !!dataempresa,
  });

  console.log(data)


  const funcionXtipo = async (p) => {
    if (p.tipo === "cerrarsesion") {
      await signOut()
    }
  }

  const [parent] = useAutoAnimate({
    duration: 500,
    easing: 'ease-in-out'
  });

  return (
    <div className="flex min-h-screen bg-gray-100">

      <div ref={parent} className="flex-1 flex flex-col">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Welcome</h1>
          <div className="relative">
            <ListMenu funcion={(p) => funcionXtipo(p)} />
          </div>
        </header>

        <main className="flex-1 p-6">
          <section className="bg-white p-6 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Area 1</h2>
            <p className="text-gray-600">Content for area 1...</p>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md mb-4">
            <BannerEmpresa />
          </section>
        </main>
      </div>
    </div>
  );

}