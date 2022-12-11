import Login from "./pages/Login"
import {Routes, Route, useNavigate} from 'react-router-dom'
import Register from "./pages/Register"
import { useEffect } from "react"
import Homepage from "./pages/Homepage"
import LoaderHoc from "./hoc/LoaderHoc"
import loaderHoc from "./hoc/LoaderHoc"
function App() {
  const navigate = useNavigate()
  return (
    <div className="App !font-primary h-full !bg-mainBg">
      <Routes>
        <Route path="/login" element={loaderHoc(Login)} />
        <Route path="/register" element={loaderHoc(Register)} />
        <Route path="/home" element={<Homepage/>} />
      </Routes>
        {/* <AiSearch/> */}
       </div>
  )
}

export default App
