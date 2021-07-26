import {
  Flex, 
} from '@chakra-ui/react'
import { Header } from '../src/components/Header';
import { Sidebar } from '../src/components/Sidebar';
import { ReactNode } from 'react';
import {motion} from 'framer-motion'

const MotionFlex = motion(Flex);

interface DashboardProps {
  children: ReactNode;
}

export default function Dashboard({children}:DashboardProps) {
  return (
    <Flex flexDir='column' h='100vh'> 
      <Header />
      <MotionFlex     variants={{
        delay: 1,
        hidden: { opacity: 0, transform: "translateY(40px)" },
        show: { opacity: 1,  transform: "translateY(0px)", transition: { duration: 0.8, delay: 1}, }
      }}
      initial="hidden"
      animate="show" w='100%' maxWidth={1480} mx='auto' px={['3','6']} flexDir={['column', 'row']}>
        <Sidebar/>
        <Flex  flex='1'  align='flex-start'>
          {children}
        </Flex>
      </MotionFlex>
    </Flex>
  )
}