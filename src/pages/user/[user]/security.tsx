import React from 'react'
import Layout from '../userPageLayout'
import PageWithIndexLayoutType from '@/types/page'
import { IndexLayout } from '@/layouts/IndexLayout'

type Props = {}

function SecurityPage({}: Props) {

  return (
    <>
      <Layout>
        <p>security page</p>
      </Layout>
    </>
  )
}

(SecurityPage as PageWithIndexLayoutType).layout = IndexLayout;

export default SecurityPage;