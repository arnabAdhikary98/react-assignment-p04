import { 
    Box, 
    Button, 
    Flex, 
    Container,
    SimpleGrid,
    Select,
    HStack
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import LoadingIndicator from "../components/LoadingIndicator"
import ErrorIndicator from "../components/ErrorIndicator"
import TicketCard from "../components/TicketCard"


export default function Tickets(){
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [tickets, setTickets] = useState([])
    const [error, setError] = useState(false)
    const [sortOrderValue, setSortOrderValue] = useState("")
    const [filterValue, setFilterValue] = useState("")

    async function fetchAndUpdateData(sortOrderValue, filterValue){
        try {
            let queryParams = {}

            if (filterValue) {
                queryParams.status = filterValue
            }

            if (sortOrderValue) {
                queryParams._sort = "priority"
                queryParams._order = sortOrderValue
            }

            let res = await axios({
                method : "get",
                url: `http://localhost:3000/Tickets`,
                params : queryParams
            })

            let data = res?.data
            setLoading(false)
            setTickets(data)
            
        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }


    useEffect(()=>{
        fetchAndUpdateData(sortOrderValue, filterValue)
    },[sortOrderValue, filterValue])

    if (loading){
        return (<LoadingIndicator />)
    }

    if (error){
        return (<ErrorIndicator />)
    }

    return(
        <Container maxW="container.xl" >
                <Flex direction="row-reverse" justify="space-between" align="center" >
                    <Button 
                    variant="solid" 
                    colorScheme="blue"
                    marginY={8}
                    maxW="200px"
                    onClick={()=>(navigate("/tickets/create"))} 
                    >
                        Create Tickets
                    </Button>
                </Flex>
                <HStack spacing={4} my={4} >
                    <Select placeholder='Sort By Priority' value={sortOrderValue} onChange={(e)=> {setSortOrderValue(e.target.value)}} >
                    <option value='asc'>Low To High</option>
                    <option value='desc'>High To Low</option>
                    </Select>

                    <Select placeholder='Filter By Status' value={filterValue} onChange={(e)=> {setFilterValue(e.target.value)}} >
                    <option value='pending'>Pending</option>
                    <option value='progress'>Progress</option>
                    <option value='completed'>Completed</option>
                    </Select>
                </HStack>
                <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={10} >
                {tickets?.map((ticket)=>(
                    <TicketCard {...ticket} key={ticket.id} />
                ))}
                </SimpleGrid>
        </Container>
    )
}