import { Link as ReactRouterLink} from "react-router-dom"
import { Flex, Link as ChakraLink} from "@chakra-ui/react"

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
        to: "/login",
        label: "LOGIN"
    },
    {
        to: "/Ticket",
        label: "TICKET"
    }
]

export default function Navbar(){
    return(
        <Flex 
        p="5"
        background="gray.400"
        justify="space-around"
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
        </Flex>
    )
}