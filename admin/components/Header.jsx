import { config } from '@/getToken'
import axios from 'axios'
import React from 'react'

const Header = ({page}) => {
  const [name, setName] = React.useState('')
  React.useEffect(() => {
    return async () => {
      try {
        const res = await axios.get('/api/admin/me', config)
        setName(res.data.name)
        return res.data
      } catch (error) {
        console.log(error)
      }
    }
  }, [])
  return (
    <div className='flex justify-between px-4 pt-4'>
        <h2>{page}</h2>
        <h2>Welcome Back, {name} </h2>
    </div>
  )
}

export default Header