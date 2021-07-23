import {
  Box, 
  Text, 
  List, 
  ListItem, 
  ListIcon,
  Stack,
} from '@chakra-ui/react'
import {SiNextDotJs, SiTypescript, SiCss3} from 'react-icons/si';
import Dashboard from '../util/Dashboard'

export default function Home(){
  return (
    <Dashboard>
      <Box p='8' w='100%' bg='gray.800' borderRadius={8}>
              <Stack spacing='5'>
              <Text fontSize='26px' textAlign='center' mb='4'>
                Bem-vindo(a) a minha aplicação para o teste de Front-End
              </Text>
              <Text>
                Eu desenvolvi esse pequeno dashboard com a 
                listagem de ativiades utilizando :
              </Text>
              <List spacing={3}>
                  <ListItem>
                    <ListIcon as={SiNextDotJs} color="blue.300" />
                      NextJS
                  </ListItem>
                  <ListItem>
                    <ListIcon as={SiTypescript} color="blue.300" />
                      TypeScript
                  </ListItem>
                  <ListItem>
                    <ListIcon as={SiCss3} color="blue.300" />
                    ChakraUi para estilização
                  </ListItem>
                </List>
                <Text textAlign='center' color='pink.500'>
                  Para ver o objetivo do teste basta clicar no menu de atividades
                  </Text>
                </Stack>
            </Box>
    </Dashboard>
  )
}