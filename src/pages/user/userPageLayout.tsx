import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

type Props = {}

export default function Layout({children}: {children:React.ReactNode}) {

  const { data:session } = useSession();
  const router = useRouter()

  return (
    <div className="w-full flex flex-col items-start justify-start">
      <div className='w-full flex justify-center'>

        <div className='w-1/2 justify-center flex flex-col gap-8'>

          <div className='flex flex-col gap-2 mt-8 ml-4'>
            <h2 className='text-5xl font-semibold tracking-widest'>Welcome</h2>
            <p className='text-2xl tracking-wide'>Account page</p>
          </div>

          <div className='w-full h-96 border border-black rounded-md flex flex-row gap-6 p-2 py-4'>
            <div className='w-1/6 flex flex-col gap-4'>
              <Link href={`/user/${session?.user.name}/account`} className={`p-2 text-xl text-center ${router.pathname.endsWith('/account') ? ("font-bold") : ("font-normal")}`}>Account</Link>
              <Link href={`/user/${session?.user.name}/security`} className={`p-2 text-xl text-center ${router.pathname.endsWith('/security') ? ("font-bold") : ("font-normal")}`}>Security</Link>
            </div>

            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}