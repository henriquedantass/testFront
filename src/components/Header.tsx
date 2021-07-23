import { Flex, Text, Input, Icon, HStack, Box, Avatar } from "@chakra-ui/react";
import { RiNotificationLine, RiSearchLine, RiUserAddLine } from 'react-icons/ri'

export function Header(){
  return (
    <Flex
      as='header'
      w='100%'
      maxWidth={1480}
      h='20'
      mx='auto'
      mt='4'
      mb='10'
      px='6'
      align='center'
      flexDir={['column', 'row']}
    >
      <Text
        fontSize='3xl'
        fontWeight='bold'
        letterSpacing='tight'
        w='64'
        textAlign={['center']}
      >
        TesteFront-End
        <Text color='pink.500'as='span' ml='1'>.</Text>
      </Text>
      <Flex
        align='center'
        ml='auto'
      >
        <HStack 
        spacing={[0,8]}
        mx='8'
        pr='8'
        py='1'
        color='gray.300'
        borderRightWidth={1}
        borderColor= 'gray.700'  
        >
          <Icon as={RiNotificationLine} fontSize='20'/>
          <Icon as={RiUserAddLine} fontSize='20'/>
        </HStack>
        <Flex
        align='center'
        >
          <Box mr='4' textAlign='right'>
            <Text>Henrique Dantas</Text>
            <Text color='gray.300' fontSize='small'>henrique@hotmail.ph</Text>
          </Box>
          <Avatar size='md' name='Henrique Dantas' src='https://github.com/henriquedantass.png'/>
        </Flex>
      </Flex>
   
    </Flex>

  )
}