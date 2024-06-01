import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import LoadingIndicator from "../components/LoadingIndicator"
import ErrorIndicator from "../components/ErrorIndicator"
import { 
    Box,
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter,     
    StackDivider,
    Stack,
    Heading,
    Text,
    Button,
    HStack 
} from '@chakra-ui/react'

export default function TicketView(){
    const { id } = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [ticket, setTicket] = useState({})
    const [error, setError] = useState(false)

    async function fetchAndUpdateData(id){
        setLoading(true)
        try {
            let res = await axios({
                method : "get",
                url: `http://localhost:3000/Tickets/${id}`,
            })

            let data = res?.data
            setLoading(false)
            setTicket(data)
            
        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }

    useEffect(()=>{
        fetchAndUpdateData(id)
    },[id])

    async function handleDeleteTicket(){
        try {
            let res = await axios({
                method: "delete",
                url : `http://localhost:3000/Tickets/${id}`
            })
            if (res.status === 200){
                navigate("/tickets")
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (loading){
        return (<LoadingIndicator />)
    }

    if (error){
        return (<ErrorIndicator />)
    }

    const {title, assignee, description, status, priority } = ticket

    return(
        <Card>
            <CardHeader>
                <Heading size='md'> {title} </Heading>
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                    <Heading size='xs' textTransform='uppercase'>
                    Status
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                    {status}
                    </Text>
                </Box>
                <Box>
                    <Heading size='xs' textTransform='uppercase'>
                    Priority
                    </Heading>
                    <Text pt='4' fontSize='sm'>
                    {priority}
                    </Text>
                </Box>
                <Box>
                    <Heading size='xs' textTransform='uppercase'>
                    Description
                    </Heading>
                    <Text pt='4' fontSize='sm'>
                    {description}
                    </Text>
                </Box>
                <Box>
                    <Heading size='xs' textTransform='uppercase'>
                    Assignee
                    </Heading>
                    <Text pt='4' fontSize='sm'>
                    {assignee}
                    </Text>
                </Box>
                </Stack>
            </CardBody>
            <CardFooter>
                <HStack spacing={4} >
                    <Button 
                    variant='outline' 
                    colorScheme='blue' 
                    onClick={()=> {navigate(`/ticket/edit/${id}`)}} >
                        Edit Ticket
                    </Button>
                    <Button 
                    variant='outline' 
                    colorScheme='red' 
                    onClick={handleDeleteTicket} >
                        Delete Ticket
                    </Button>
                </HStack>
            </CardFooter>
        </Card>
    )
}