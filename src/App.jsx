import {Routes, Route, useNavigate, useLocation} from 'react-router-dom'
import { useEffect } from "react"
import { useAuth } from "./hooks/useAuth"
import ErrorPage from "./pages/public/404"
import { protectedRoutes, publicRoutes } from "./routes/routes"
import { PublicRoutes } from "./routes/public-routes"
import { ProtectedRoutes } from "./routes/protected-routes"
function App() {
  const navigate = useNavigate()
  const {auth} = useAuth()
  const location = useLocation()
  useEffect(() => {
  if(location.pathname == '/') navigate('/login')
  }, [])
  
  return (
    <div className="App !font-primary h-full !bg-mainBg">
      <Routes>
      <Route path="/" element={<PublicRoutes/>}>
        {
          publicRoutes.map(route => {
            return(
              <Route key={route.path} path={route.path} element={<route.component/>} />
            )
          })
        }
        </Route>
        <Route path="/" element={<ProtectedRoutes/>}>
        {
          protectedRoutes.map(route => {
            return(
              <Route key={route.path} path={route.path} element={<route.component/>} />
            )
          })
        }
         <Route path="*" element={<ErrorPage/>} />
        </Route>
       
      </Routes>
        {/* Figma URL  */}
        {/* https://www.figma.com/file/PtQTuDYzsrcBrp3RobkEpD/Remarques?node-id=1%3A2 */}
       
       </div>
  )
}

export default App
