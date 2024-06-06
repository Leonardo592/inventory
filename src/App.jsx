
import { useLocation } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/LoginPage.jsx'
import { AuthProvider } from './context/AuthContext'
import { MyRoutes } from './routes/routes.jsx'


function App() {

  // const { mostrarUsuarios, idUsuario } = useUsuariosStore()
  // // const { mostrarEmpresa } = useEmpresaStore()
  // const { data, isLoading, error } = useQuery({ queryKey: ['mostrarUsuarios'], queryFn: mostrarUsuarios })

  // const { data: dataEmpresa } = useQuery({ queryKey: ['mostrarEmpresa'], queryFn: () => mostrarEmpresa({ idUsuario: idUsuario }), enabled: !!dataUsuarios })

  // if (isLoading) {
  //   console.log('dadada')
  //   return <SpinnersLoading></SpinnersLoading>
  // }

  // console.log(data)

  // // if (error) {
  // //   return <span>Error...</span>
  // // }

  const { pathname } = useLocation()

  return (
    <>
      <AuthProvider>
        {
          pathname === '/login' ? (
            <LoginPage></LoginPage>
          ) : (
            <MyRoutes></MyRoutes>
          )
        }
      </AuthProvider>

    </>
  )
}

export default App
