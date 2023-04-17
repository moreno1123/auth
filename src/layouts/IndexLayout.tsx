import React from 'react'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Navigation from '@/components/navigation/Navigation'

export function IndexLayout ({ children }: { children: React.ReactNode}){
  return (
    <>
      <Head>
        <title>Authentification</title>
      </Head>

      <div className="w-full flex items-start justify-center flex-col">
        <Navigation/>

        <div className='w-full'>{children}</div>
      </div>
    </>
  )
}
