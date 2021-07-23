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
  Text,
  Box,
} from '@chakra-ui/react'
import {format} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';

const taskList = [
  {id: 1, name: 'CodeReview' ,  data: new Date('02-25-2021 16:00:00'), status: 'pendente'},
  {id: 2, name: 'DeployAPP' , data:  new Date('07-20-2023 12:30:00'), status: 'concluida'},
  {id: 3, name: 'Criar componente',  data: new Date('05-19-2021 11:30:00'), status: 'pendente'},
  {id: 4, name: 'Brainstorm' , data:  new Date('03-14-2021 09:30:00' ), status: 'cancelada'}
]


export default function Tasks(){
  const [filter, setFilter] = useState('')
  console.log(filter)

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
            {taskList.filter(task => {
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
            {taskList.sort((a, b) => new Date(a.data).valueOf() - new Date(b.data).valueOf()).map(task => (
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
      </Flex>
    </Dashboard>
  )
}