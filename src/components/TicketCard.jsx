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
    Button 
} from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom'


export default function TicketCard({ id, title, status, priority}){
    const navigate = useNavigate()

    return(
        <Card>
            <CardHeader>
                <Heading size='md'> { title } </Heading>
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                    <Heading size='xs' textTransform='uppercase'>
                    Status
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                    { status }
                    </Text>
                </Box>
                <Box>
                    <Heading size='xs' textTransform='uppercase'>
                    Priority
                    </Heading>
                    <Text pt='4' fontSize='sm'>
                    { priority }
                    </Text>
                </Box>
                </Stack>
            </CardBody>
            <CardFooter>
                <Button variant='outline' colorScheme='orange' onClick={()=> {
                    navigate(`/tickets/view/${id}`)
                }} >
                    View Ticket
                </Button>
            </CardFooter>
        </Card>
    )
}