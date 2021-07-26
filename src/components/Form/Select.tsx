import { 
  Select, 
  SelectProps, 
  InputGroup, 
  Flex
} from '@chakra-ui/react'
import { useField } from '@unform/core'
import { useState } from 'react'
import { useEffect, useRef } from 'react'

import { ReactNode } from 'react'


interface SelectForm extends SelectProps  {
  children: ReactNode
  name: string;
  mask?: string;
  maskChar?: string;
  placeholder?: string;
}

export const SelectField: React.FC<SelectForm> = ({
  name,
  placeholder,
  children,
  ...rest
  }) => {
  const inputRef = useRef<HTMLSelectElement>(null);
  
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
          <InputGroup>
              <Select 
                  size="lg"
                  ref={inputRef}
                  name={name}
                  onFocus={() => {setIsFocused(true)}}
                  onBlur={() => {setIsFocused(false)}}
                  onChangeCapture={(e) => {setInputValue(e.currentTarget.value)}}
                  fontSize={14}                    
                  placeholder={placeholder}
                  _focus={{bgColor: "blackAlpha.600", border: "1px solid rgba(0, 187, 255, 1) !important"}} 
                  defaultValue={defaultValue}
                  colorScheme="blackAlpha" 
                  bg='blackAlpha.500'
                  {...rest}
              >
                  {children}
              </Select>
          </InputGroup>
      </Flex>
  )
}