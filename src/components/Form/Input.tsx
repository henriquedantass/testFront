import { 
  Input, 
  InputProps,
  InputGroup, 
  InputRightElement, 
  Icon, 
  Tooltip,
  Box, 
  Flex
} from '@chakra-ui/react'
import { useField } from '@unform/core'
import { useState } from 'react'
import { useEffect, useRef } from 'react'
import {BiErrorCircle} from 'react-icons/bi'
interface PotatosInputProps extends InputProps  {
  name: string;
  mask?: string;
  maskChar?: string;
  placeholder?: string;
}

export const InputField: React.FC<PotatosInputProps> = ({
  name,
  placeholder,
  ...rest
  }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { fieldName, defaultValue, error, registerField } = useField(name)
  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const changeColor = inputValue?.length > 0 ? "rgba(0, 187, 255, 0.427)" : "transparent"
  useEffect(() => {
  registerField({
    name: fieldName,
    ref: inputRef.current,
    path: 'value',
  });
}, [fieldName, registerField]);

  return (
      <Flex flexDir='column' position="relative">
          <Box
            opacity={isFocused ? 1 : 0.5 }
            position="absolute"
            transition="0.2s all"
            color={isFocused ? "blue.500" : "white" }
            zIndex={isFocused ? "3" : "initial" }
            fontSize={isFocused || inputValue.length > 0 ? 11 : 14 }
            ml="15px"
            mt={isFocused || inputValue.length > 0 ? "5px" : "14px" }
          >
              {placeholder}
          </Box>
          <InputGroup>
              <Input 
                  size="lg"
                  ref={inputRef}
                  name={name}
                  onFocus={() => {setIsFocused(true)}}
                  onBlur={() => {setIsFocused(false)}}
                  onChangeCapture={(e) => {setInputValue(e.currentTarget.value)}}
                  fontSize={14}
                  paddingTop="15px"                    
                  // placeholder={placeholder}
                  _focus={{bgColor: "blackAlpha.600", border: "1px solid rgba(0, 187, 255, 1) !important"}} 
                  border={`1px solid ${error ? "#f00" : changeColor} !important`}
                  defaultValue={defaultValue}
                  colorScheme="blackAlpha" 
                  bg='blackAlpha.500'
                  {...rest}
              />
              {error &&
                  <Tooltip placement="top" bgColor="#000" color="white" label={error} aria-label="A tooltip">
                      <InputRightElement h="100%" children={
                          <Icon color="#f00" size={10}  as={BiErrorCircle} />
                      } />    
                  </Tooltip>
                  } 
              
          </InputGroup>
      </Flex>
  )
}