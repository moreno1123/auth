import React from 'react'
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useQuery } from 'react-query'
import { getUser } from '@/lib/userHelper'

type Props = {}

export default function Navigation({}: Props) {

  const { isLoading, isError, data, error } = useQuery(['user'], getUser)

  return (
    <div className="userNavigation w-full">
      <div className="w-full top-0 right-0 flex justify-between items-center border-b-2 border-black py-6 z-0">
        
        <div className='ml-12'>
          <Link href={"/"}>
            <p className='text-4xl tracking-wider'>
              LO<strong>G</strong>O
            </p>
          </Link>
        </div>
        <div className='flex flex-row justify-center items-center'>
          <Link href={`/user/${data?.user?.name}/account`}>
            <img
              src={data?.user?.image!}
              alt={`${data?.user?.name} image`}
              className="rounded-full h-14 w-14 bg-slate-500 mr-2"
            />
          </Link>
          
          <div>
            <button
              className="text-md uppercase px-6 rounded-md ease-linear transition-all duration-150 mr-10"
              onClick={() => signOut()}>
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

