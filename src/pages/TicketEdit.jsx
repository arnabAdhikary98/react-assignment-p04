import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import LoadingIndicator from "../components/LoadingIndicator"
import ErrorIndicator from "../components/ErrorIndicator"
import { 
    Container,
    Input,
    Textarea,
    VStack,
    Select,
    Button
} from "@chakra-ui/react"


export default function TicketEdit(){
    const { id } = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [ticket, setTicket] = useState({})
    const [error, setError] = useState(false)

    // const [title, setTitle] = useState("")
    // const [desc, setDesc] = useState("")
    // const [assignee, setAssignee] = useState("")
    // const [status, setStatus] = useState("")
    // const [priority, setPriority] = useState("")

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

            console.log(data)
            
        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }

    useEffect(()=>{
        fetchAndUpdateData(id)
    },[id])

    async function handleEditTicket(){
        try {
            const updateTicket = {
                title: title,
                description: description,
                assignee: assignee,
                status: status,
                priority: priority,
            }

            let res = await axios({
                method : "put",
                url : `http://localhost:3000/Tickets/${id}`,
                data : updateTicket
            })

            if (res.status === 200){
                navigate(`/tickets`)
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

    const { id:ticketId, title, assignee, description, status, priority } = ticket

    return(
        <Container>
            <VStack spacing={8} my={4} >
                <Input placeholder='Enter Title'
                size= "lg"
                value= {title}
                onChange={(e)=> {
                    setTicket({
                        ...ticket, 
                        title: e.target.value})
                    }} 
                />
                <Textarea 
                placeholder='Enter Description' 
                size="lg" 
                value={description} 
                onChange={(e)=> {
                    setTicket({
                        ...ticket, 
                        description: e.target.value})
                    }}
                />
                <Select placeholder='Select Assginee'
                    value={assignee} 
                    onChange={(e)=> {
                        setTicket({
                            ...ticket, 
                            description: e.target.value})
                        }}>
                    <option value='Rahul'>Rahul</option>
                    <option value='Arnab'>Arnab</option>
                    <option value='Akash'>Akash</option>
                    <option value='Rakesh'>Rakesh</option>
                    <option value='Animesh'>Animesh</option>
                    <option value='Ajay'>Ajay</option>
                    <option value='Bishal'>Bishal</option>
                    <option value='Vikas'>Vikas</option>
                    <option value='Alex'>Alex</option>
                    <option value='Robin'>Robin</option>
                </Select>
                <Select 
                placeholder='Select Status' 
                value={status} 
                onChange={(e)=> {
                    setTicket({
                        ...ticket, 
                        status: e.target.value})
                    }}>
                    <option value='pending'>Pending</option>
                    <option value='progress'>Progress</option>
                    <option value='completed'>Completed</option>
                </Select>
                <Select 
                placeholder='Select Priority' 
                value={priority} 
                onChange={(e)=> {
                    setTicket({
                        ...ticket, 
                        priority: Number(e.target.value)})
                    }}>
                    <option value={0}> 0 </option>
                    <option value={1}> 1 </option>
                    <option value={2}> 2 </option>
                    <option value={3}> 3 </option>
                    <option value={4}> 4 </option>
                    <option value={5}> 5 </option>
                    <option value={6}> 6 </option>
                    <option value={7}> 7 </option>
                    <option value={8}> 8 </option>
                    <option value={9}> 9 </option>
                </Select>
                <Button colorScheme='blue' variant='outline' onClick={handleEditTicket} >
                    Edit Ticket
                </Button>
            </VStack>
        </Container>
    )
}