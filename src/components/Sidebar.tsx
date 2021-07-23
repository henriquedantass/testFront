import { Text, Box, Stack, Icon, Flex  } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import {FaTasks, FaHome} from 'react-icons/fa' 
import Link from 'next/link';


export function Sidebar(){
  return (
    <Box as='aside' w='64' mr='8'>
      <Stack spacing='12' align='flex-start' flexDir={['column', 'row']
    }>
        <Box mt='5'>
                <Stack  spacing={5} > 
                <Link  href='/' >
                  <Flex cursor='pointer' _hover={{opacity: 0.5}}>
                    <Icon as={FaHome} color='white' fontSize='20'/>
                    <Text ml='4' fontWeight='medium'>Inicio</Text>
                  </Flex>
                  </Link>
                  <Link  href='/tasks' >
                    <Flex cursor='pointer' _hover={{opacity: 0.5}}>
                      <Icon as={FaTasks} color='white' fontSize='20'/>
                      <Text ml='4' fontWeight='medium'>Atividades</Text>
                    </Flex>
                  </Link>
                </Stack>
        </Box>
      </Stack>
    </Box>
  )

}