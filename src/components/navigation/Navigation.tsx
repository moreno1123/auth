import React from 'react'
import { NextPageContext } from 'next';
import { getSession, useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

type Props = {}

export default function Navigation({}: Props) {

  const { data: session } = useSession();

  return (
    <div className='w-full flex items-start'>
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
            <Link href={{ pathname: '/user/[user]', query: { user: session?.user?.name }  }} as="/user/[user]">
              <img
                src={session?.user?.image!}
                alt={`${session?.user?.name} image`}
                className="rounded-full h-14 w-14 bg-slate-500 mr-4"
              />
            </Link>
            <p>{session?.user?.name}</p><br/>
            
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
    </div>
  )
}

export async function getServerSideProps(ctx: NextPageContext) {

  const session = await getSession(ctx);
  
  return {
    props: {
      session,
    },
  };
}
