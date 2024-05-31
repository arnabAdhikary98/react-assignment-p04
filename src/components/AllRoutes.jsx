import { Routes, Route, Navigate} from "react-router-dom"
import Home from "../pages/Home"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Login from "../pages/Login"
import Ticket from "../pages/Ticket"
import { useContext } from "react"
import { AuthContext } from "../Context/AuthContextProvider"

function PrivateRoute({children}){
    const { authDetails } = useContext(AuthContext)
    
    if(!authDetails?.isLoggedIn){
        return <Navigate to="/login" />
    }

    return children
}

export default function AllRoutes(){
    return(
        <>
        <Routes>
            <Route path="/" element={
                <PrivateRoute>
                <Home />
                </PrivateRoute>
            } />
            <Route path="/about" element={
                <PrivateRoute>
                    <About />                   
                </PrivateRoute>
            } />
            <Route path="/Contact" element={
                <PrivateRoute>
                    <Contact />
                </PrivateRoute>
            } />
            <Route path="/ticket" element={
            <PrivateRoute>
                <Ticket />
            </PrivateRoute>
            } />
            <Route path="/login" element={
                <Login />
            } />
        </Routes>
        </>
    )
}