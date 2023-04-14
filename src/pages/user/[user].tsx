import React from 'react'
import { NextPageContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Navigation from '@/components/navigation/Navigation';

type Props = {}

export default function userPage({}: Props) {

  return (
    <div className="home min-h-screen flex flex-col gap-10 items-start justify-start">
      <Navigation />

      <div className='w-full flex justify-center'>

        <div className='w-1/2 justify-center flex flex-col gap-4'>

          <div className='flex flex-col gap-2'>
            <h2 className='text-5xl font-semibold tracking-widest'>Welcome</h2>
            <p className='text-2xl tracking-wide'>Account page</p>
          </div>

          <form className='w-full border border-black rounded-md'>

          </form>
        </div>
      </div>
    </div>
  )
}
