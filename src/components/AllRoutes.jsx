import { Routes, Route} from "react-router-dom"
import Home from "../pages/Home"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Login from "../pages/Login"
import Ticket from "../pages/Ticket"

export default function AllRoutes(){
    return(
        <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ticket" element={<Ticket />} />
        </Routes>
        </>
    )
}