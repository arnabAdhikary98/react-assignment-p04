import { Routes, Route, Navigate} from "react-router-dom"
import Home from "../pages/Home"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Login from "../pages/Login"
import Tickets from "../pages/Tickets"
import TicketCreate from "../pages/TicketCreate"
import TicketView from "../pages/TicketView"
import TicketEdit from "../pages/TicketEdit"
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
            <Route path="/contact" element={
                <PrivateRoute>
                    <Contact />
                </PrivateRoute>
            } />
            <Route path="/tickets" element={
            <PrivateRoute>
                <Tickets />
            </PrivateRoute>
            } />
            <Route path="/tickets/create" element={
            <PrivateRoute>
                <TicketCreate />
            </PrivateRoute>
            } />
            <Route path="/tickets/view/:id" element={
            <PrivateRoute>
                <TicketView />
            </PrivateRoute>
            } />
            <Route path="/ticket/edit/:id" element={
            <PrivateRoute>
                <TicketEdit />
            </PrivateRoute>
            } />
            <Route path="/login" element={
                <Login />
            } />
        </Routes>
        </>
    )
}