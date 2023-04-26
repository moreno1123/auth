import React from 'react'
import Layout from '../userPageLayout'
import PageWithIndexLayoutType from '@/types/page'
import { IndexLayout } from '@/layouts/IndexLayout'
import Link from 'next/link'

type Props = {}

function SecurityPage({}: Props) {

  return (
    <>
      <Layout>
        <div className='flex flex-col gap-4'>
          <p className='text-xl font-bold mb-1'>Forgot password?</p>
          <Link href="/forgot" className="text-blue-600">
              Reset password
          </Link>
        </div>
      </Layout>
    </>
  )
}

(SecurityPage as PageWithIndexLayoutType).layout = IndexLayout;

export default SecurityPage;
