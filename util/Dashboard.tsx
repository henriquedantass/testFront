import {
  Flex, 
  Box, 
} from '@chakra-ui/react'
import { Header } from '../src/components/Header';
import { Sidebar } from '../src/components/Sidebar';
import { ReactNode } from 'react';

interface DashboardProps {
  children: ReactNode;
}

export default function Dashboard({children}){
  return (
    <Flex flexDir='column' h='100vh'> 
      <Header />
      <Flex w='100%' maxWidth={1480} mx='auto' px='6' flexDir={['column', 'row']}>
        <Sidebar/>
        <Flex  flex='1'  align='flex-start'>
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}