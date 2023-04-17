import React from 'react'
import { useQuery } from 'react-query'
import { getUser, updateUser } from '@/lib/userHelper'
import { useReducer } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify';
import PageWithIndexLayoutType from '@/types/page'
import { IndexLayout } from '@/layouts/IndexLayout'
import Layout from '../userPageLayout'

type Props = {}

const formReducer = (state:any, event:any) => {
  return{
    ...state,
    [event.target.name]: event.target.value
  }
}

function AccountPage({}: Props) {

  const [formData, setFormData] = useReducer(formReducer, {})

  const queryClient = useQueryClient();

  const addMutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.prefetchQuery('user', getUser)
      toast.success("User has been updated")
    }
  })

  const { isLoading, isError, data, error } = useQuery(['user'], getUser)
  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error...</div>

  function handleSubmit(e:any){
    e.preventDefault()
    
    let { name } = formData;
    
    const model = {
      name,
    }
    
    addMutation.mutate(model)
  }

  return (
    <Layout>
      <div className='flex flex-col gap-4'>
        <div>
          <p className='text-xl font-bold'>Email</p>
          <p>{data?.user.email}</p>
        </div>

        <div>
          <p className='text-xl font-bold mb-1'>Profile picture</p>
          <img
            src={data?.user.image!}
            alt={`${data?.user.name} image`}
            className="rounded-full h-14 w-14 bg-slate-500 mr-2"
          />
        </div>

        <form onSubmit={e => handleSubmit(e)} className='flex flex-col gap-2'>
          <label htmlFor="name" className='text-xl font-bold'>Name</label>

          <input type="text" name="name" defaultValue={data?.user.name} onChange={setFormData} className='border border-black p-1 rounded-md'/>

          <div className='w-full flex justify-center'>
            <button type='submit' className='rounded-full bg-blue-400 p-1 px-6'>Update</button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

(AccountPage as PageWithIndexLayoutType).layout = IndexLayout;

export default AccountPage;
