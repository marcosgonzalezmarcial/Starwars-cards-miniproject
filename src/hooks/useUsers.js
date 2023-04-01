import { useContext } from 'react'
import { UsersContext } from 'contexts/UsersContext'

export const useUsers = () => useContext(UsersContext)
