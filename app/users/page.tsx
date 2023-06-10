import { FC } from 'react'
import EmptyState from '../components/EmptyState'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  return (
    <div className='hidden lg:pl-80 lg:block h-full'>
      <EmptyState/>
    </div>
  )
}

export default page