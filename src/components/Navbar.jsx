import { Link as ReactRouterLink} from "react-router-dom"
import { Flex, Link as ChakraLink, Button} from "@chakra-ui/react"
import { useContext } from "react"
import { AuthContext } from "../Context/AuthContextProvider"

const links = [
    {
        to: "/",
        label: "HOME"
    },
    {
        to: "/about",
        label: "ABOUT"
    },
    {
        to: "/contact",
        label: "CONTACT"
    },
    {
        to: "/Ticket",
        label: "TICKET"
    },
    {
        to: "/login",
        label: "LOGIN"
    }
]

export default function Navbar(){
    const { logout } = useContext(AuthContext)

    return(
        <Flex 
        p="3"
        background="gray.400"
        justify="space-around"
        align="center"
        >
        {links?.map((link)=>(
            <ChakraLink
            as={ReactRouterLink} 
            key={link.to} 
            to={link.to}
            >
                {link.label}
            </ChakraLink>
        ))}
        <Button variant="outline" colorScheme="red" onClick={logout} >LOGOUT</Button>
        </Flex>
    )
}