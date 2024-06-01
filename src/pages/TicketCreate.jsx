import { 
    Container,
    Input,
    Textarea,
    VStack,
    Select,
    Button
} from "@chakra-ui/react"
import { useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function TicketCreate(){
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [assignee, setAssignee] = useState("")
    const [status, setStatus] = useState("")
    const [priority, setPriority] = useState("")

    const navigate = useNavigate()


    async function handleCreateTicket(){
        try {
            const newTicket = {
                title: title,
                description: desc,
                assignee: assignee,
                status: status,
                priority: priority,
            }
            let res = await axios({
                method: "post",
                url: `http://localhost:3000/Tickets`,
                data : newTicket
            })
            if (res.status === 201){
                navigate(`/tickets`)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return(
        <Container>
            <VStack spacing={8} my={4} >
                <Input placeholder='Enter Title'
                size= "lg"
                value= {title}
                onChange={(e)=> {setTitle(e.target.value)}} 
                />
                <Textarea 
                placeholder='Enter Description' 
                size="lg" 
                value={desc} 
                onChange={(e)=> {setDesc(e.target.value)}} />
                <Select placeholder='Select Assginee'
                    value={assignee} 
                    onChange={(e)=> {setAssignee(e.target.value)}}>
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
                <Select placeholder='Select Status' value={status} onChange={(e)=> {setStatus(e.target.value)}}>
                    <option value='pending'>Pending</option>
                    <option value='progress'>Progress</option>
                    <option value='completed'>Completed</option>
                </Select>
                <Select placeholder='Select Priority' value={priority} onChange={(e)=> {setPriority(Number(e.target.value))}}>
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
                <Button colorScheme='blue' variant='outline' onClick={handleCreateTicket} >
                    Create Ticket
                </Button>
            </VStack>
        </Container>
    )
}