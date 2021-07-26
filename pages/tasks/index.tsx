import Dashboard from '../../util/Dashboard'
import {
  Flex, 
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  HStack,
  Text,
  Stack,
  useDisclosure,
  Icon,
} from '@chakra-ui/react'
import {format} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import {InputField} from '../../src/components/Form/Input'
import {BiCheck} from 'react-icons/bi'
import {IoIosClose} from 'react-icons/io'
import {BsTrash} from 'react-icons/bs'

interface TaskProps {
  id: number;
  name: string;
  data: Date;
  status: string;
}

export default function Tasks(){
  const [ task, setTask] = useState<TaskProps []>([])
  const [filter, setFilter] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formRef = useRef<FormHandles>(null);

  const statusFormat = {
    pendente: {
      color: 'orange.500',
    },
    cancelada: {
      color: 'red.500',
    },
    concluida: {
      color: 'green.500',
    }
  }

  async function handleSubmit(data:TaskProps){
    try {
      await setTask([...task , 
        {id: Math.random() ,name:data.name , data: new Date(data.data) , status: 'pendente'}]) 
    } catch (e) {
      console.log(e)
    }
   
    onClose();  
  }

  function handleSetComplete(id){
    setTask(task.map(item => item.id === id ? { ...item, status:'concluida'} : item))
  }

  function handleSetCanceled(id) {
    setTask(task.map(item => item.id === id ? { ...item, status:'cancelada'} : item))
  }

  function handleRemoveTask(id) {
    setTask(task.filter(item => item.id !== id))
  }


  return (
    <Dashboard>
      <Flex w='100%' bg='gray.800' p='1rem' borderRadius='10px' flexDir='column' mt='20px'>
        <Select   
        _focus={{bgColor: "blackAlpha.600", border: "1px solid rgba(0, 187, 255, 1) !important"}} 
        colorScheme="blackAlpha"  
        mb='20px' 
        maxWidth='300px' 
        alignSelf='flex-end'
        placeholder='filtrar por'
        onChange={(e) => setFilter(e.target.value)}
        >
            <option style={{backgroundColor: '#1A202C'}}value='pendente'>pendente</option>
            <option style={{backgroundColor: '#1A202C'}}value='concluida'>concluida</option>
            <option style={{backgroundColor: '#1A202C'}}value='cancelada'>cancelada</option>
        </Select>
        <Table size='sm' variant='unstyled'>
          <Thead>
            <Tr>
              <Th >Atividade</Th>
              <Th maxWidth='100px'> <Text isTruncated >Data de criação</Text></Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          {filter.length > 0 ? (
            <>
            {task.filter(task => {
              return task.status.includes(filter);
            }).map(task => (
              <Tbody key={task.id}>
                  <Tr>
                  <Td>{task.name}</Td>
                  <Td>{format(new Date(task.data), 
                  "dd/MM/yyyy 'ás' HH:mm " , {locale:ptBR})}</Td>
                  <Td color= {statusFormat[task.status].color}>{task.status}</Td>
                  </Tr>
              </Tbody>
            ))}
            </>
          ) : (
            <>
            {task.sort((a, b) => 
            new Date(a.data).valueOf() - 
            new Date(b.data).valueOf()).map(item => (
              <Tbody key={item.id}>
                  <Tr>
                  <Td>{item.name}</Td>
                  <Td>{format(new Date(item.data), 
                  "dd/MM/yyyy 'ás' HH:mm " , {locale:ptBR})}</Td>
                  <Td color= {statusFormat[item.status].color}>{item.status}
                  </Td>
                  {item.status !== 'cancelada' && (
                       <Icon 
                       onClick={() => {handleSetCanceled(item.id)}}
                       as={IoIosClose} 
                       color="red.500" 
                       fontSize="25px"/>
                  )}
                  {item.status !== 'concluida' && (
                    <Icon 
                    onClick={() => {handleSetComplete(item.id)}}
                    as={BiCheck} 
                    color='green.500' 
                    fontSize="25px"/>
                  )}
                  <Icon 
                  onClick={() => {handleRemoveTask(item.id)}}
                  as={BsTrash} 
                  color='gray.500' 
                  fontSize='15px' ml='5px'>

                  </Icon>
                  <Td></Td>
                  </Tr>
              </Tbody>
                ))}
            </>
          )}
        </Table>
        <Button 
        onClick={onOpen}
        maxWidth='300px' 
        bg='green.500' 
        _hover={{bg:'transparent', color:'green.500'}} 
        alignSelf='flex-end' 
        mt='20px'
        >
          Nova Atividade
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} size='5x1'>
          <ModalOverlay />
          <ModalContent
            h="fit-content"
            maxW="750px"
            bg='gray.800'
            padding='0.5rem'
            borderRadius="15px"
            boxShadow="md"
            className="backdropBlur"
            border="1px solid rgba(0, 187, 255, 0.3)"
            textColor="white"
          >
            <Form ref={formRef} onSubmit={handleSubmit}>
            <ModalHeader>Nova atividade</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack>
                <InputField name='name' placeholder='Título'/>
                <InputField name='data' type ='date' />
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button
              onClick={onClose}   
              bg='red.500' 
              mr={3}
              _hover={{bg:'transparent', color:'red.500'}} 
              >
                Cancelar
              </Button>
              <Button  
              type='submit' 
              bg='green.500' 
               _hover={{bg:'transparent', color:'green.500'}} 
               >
                 Enviar
              </Button>
            </ModalFooter>
            </Form>
          </ModalContent>
      </Modal>
      </Flex>
    </Dashboard>
  )
}