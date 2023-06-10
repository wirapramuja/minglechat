'use client'

import useConversation from '@/app/hooks/useConversation'
import useRoutes from '@/app/hooks/useRoutes'
import { FC } from 'react'
import MobileItem from './MobileItem'

interface MobileFooterProps {
  
}

const MobileFooter: FC<MobileFooterProps> = ({}) => {
    const routes = useRoutes()
    const {isOpen} = useConversation()

    if (isOpen) {
        return null
    }
  return(
    <div className='
        fixed
        justify-between
        w-full
        bottom-0
        z-40
        flex
        items-center
        bg-gray-300
        border-t-[1px]
        lg:hidden
    '>
        {routes.map((route) => (
            <MobileItem
             key={route.href}
             {...route}
            />
        ))}

    </div>
  )
}

export default MobileFooter