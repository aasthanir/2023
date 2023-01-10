import React, {useState} from 'react'

export const useTogglePasswordVisibility = () => {

    const [rightIcon, setRightIcon] = useState('eye-off')
    const [passwordVisibility, setPasswordVisibility] = useState(true)
  
    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye-off') {
          setRightIcon('eye')
          setPasswordVisibility(false)
        } else if (rightIcon === 'eye') {
          setRightIcon('eye-off')
          setPasswordVisibility(true)
        }
      }
    
      return {
        passwordVisibility,
        rightIcon,
        handlePasswordVisibility
      }
  }