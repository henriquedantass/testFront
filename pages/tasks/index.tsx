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
} from '@chakra-ui/react'
import {format} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import {InputField} from '../../src/components/Form/Input'
import {SelectField} from '../../src/components/Form/Select'
const taskList = [
  {id: 1, name: 'CodeReview' ,  data: new Date('02-25-2021 16:00:00'), status: 'pendente'},
  {id: 2, name: 'DeployAPP' , data:  new Date('07-20-2023 12:30:00'), status: 'concluida'},
  {id: 3, name: 'Criar componente',  data: new Date('05-19-2021 11:30:00'), status: 'pendente'},
  {id: 4, name: 'Brainstorm' , data:  new Date('03-14-2021 09:30:00' ), status: 'cancelada'},
  {id: 5, name: 'Reunião' , data:  new Date('05-14-2021 09:30:00' ), status: 'cancelada'},
  {id: 6, name: 'Entrevista' , data:  new Date('09-14-2021 09:30:00' ), status: 'cancelada'}
]
interface TaskProps {
  id: number;
  name: string;
  data: Date;
  status: string;
}

export default function Tasks(){
  const [ task, setTask] = useState<TaskProps []>(taskList)
  const [filter, setFilter] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formRef = useRef<FormHandles>(null);

  console.log(task)
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
    await setTask([...task , 
      {id: Math.random() ,name:data.name , data: new Date(data.data) , status: 'pendente'}]) 
    onClose();  
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
                  <Td>{format(new Date(task.data), "dd/MM/yyyy 'ás' HH:mm " , {locale:ptBR})}</Td>
                  <Td color= {statusFormat[task.status].color}>{task.status}</Td>
                  </Tr>
              </Tbody>
            ))}
            </>
          ) : (
            <>
            {task.sort((a, b) => new Date(a.data).valueOf() - new Date(b.data).valueOf()).map(task => (
              <Tbody key={task.id}>
                  <Tr>
                  <Td>{task.name}</Td>
                  <Td>{format(new Date(task.data), "dd/MM/yyyy 'ás' HH:mm " , {locale:ptBR})}</Td>
                  <Td color= {statusFormat[task.status].color}>{task.status}</Td>
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
                <InputField name='data' placeholder='Data dia/mes/ano'/>
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