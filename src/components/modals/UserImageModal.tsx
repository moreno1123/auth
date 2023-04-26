import * as React from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useUserImageModalStore, useUserImagePreLoadStore } from '@/zustand/userImageStore';
import { updateUserImage } from '@/lib/userHelper'
import { useS3Upload } from "next-s3-upload";
import { useState } from 'react';
import { getUser } from '@/lib/userHelper';


interface IUserImageModalProps {
  headingText: string;
  firstButtonText: string;
  secondButtonText: string;
  params: any;
}

const UserImageModal: React.FunctionComponent<IUserImageModalProps> = (props) => {

  const [checked, setChecked] = useState("default")
  const onOptionChange = (e:any) => {
    setChecked(e.target.value)
  }

  const queryClient = useQueryClient();

  const addMutation = useMutation(updateUserImage, {
    onSuccess: () => {
      queryClient.prefetchQuery('user', getUser)
      toast.success("User image has been updated")
    }
  })

  let { uploadToS3 } = useS3Upload();

  const isLoaded = useUserImagePreLoadStore((state) => state.isLoaded)
  const toggleLoadTrue = useUserImagePreLoadStore((state) => state.toggleLoadTrue)
  const toggleLoadFalse = useUserImagePreLoadStore((state) => state.toggleLoadFalse)

  const output:any = document.getElementById('output');

  function loadFile(e:any) {
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
    toggleLoadTrue()
    setChecked("costum")
  };
  
  function removeImage(){
    output.src = "";
  }

  const isOpen = useUserImageModalStore((state) => state.isOpen)
  const toggleOpen = useUserImageModalStore((state) => state.toggleOpen)

  const handleChildElementClick = (e:any) => {
    e.stopPropagation()
  }
  
  const toggleSubmit = async (e:any) => {
    e.preventDefault();

    const input:any = document.getElementById('getFile')
    const file = input.files[0]
    
    if(checked == "default"){
      let image = "https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642479/992490_sskqn3.png";
    
      const model = {
        image,
      }
      
      addMutation.mutate(model)

    } else if (checked == "costum" && file){
      let { url } = await uploadToS3(file);
      let image = url

      const model = {
        image,
      }
      
      addMutation.mutate(model)
    } else {
      let image = "https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642479/992490_sskqn3.png";
    
      const model = {
        image,
      }
      
      addMutation.mutate(model)
    }
    

    // closing events
    removeImage();
    toggleOpen();
    
    const form:any = document.getElementById("form");
    form.reset();
    toggleLoadFalse();
  }

  
  const toggleCancel = (e:any) => {
    e.preventDefault();
    toggleOpen();
    toggleLoadFalse();
  }

  function getFile(e:any){
    e.preventDefault()
    const input:any = document.getElementById('getFile')
    input.click()
  }
  
  const { headingText, firstButtonText, secondButtonText, params } = props;

  return (
    <div id='modal' className='z-50 h-screen w-screen bg-slate-500/50 fixed top-0 left-0 justify-center items-center' style={isOpen ? {display: 'flex'} : {display: 'none'}} onClick={toggleOpen}>
      <div className='p-10 bg-white rounded-md flex flex-col gap-4 justify-center items-center' onClick={(e) => handleChildElementClick(e)}> 

        <p className='mb-4 text-2xl'>{headingText}</p>

        <form id='form' className='flex flex-col gap-6 justify-center' onSubmit={e => toggleSubmit(e)}>

          <div className='flex flex-col gap-4'>
            <div className='flex flex-row gap-4'>
              <input type="radio" name="default" value="default" id="default" onChange={onOptionChange} checked={checked === "default"}/>
              <p>Set to default image</p>
            </div>

            <div className='flex flex-row gap-4'>
              <input type="radio" name="costum" value="costum" id="costum" onChange={onOptionChange} checked={checked === "costum"}/>
              <div className='flex flex-row gap-2' style={isLoaded ? {justifyContent: 'start'} : {justifyContent: 'center'}}>
                <img id='output' className={'rounded-full h-14 w-14'} style={isLoaded ? {display: 'flex'} : {display: 'none'}}/>            

                <div className='flex items-center'>
                  <button className='rounded-full border border-black p-2 px-4' onClick={e => getFile(e)}>Upload photo</button>
                </div>

                <input type='file' id="getFile" className='hidden' onChange={loadFile}/> 
              </div>
            </div>
          </div>

          <div className='flex flex-row gap-4 justify-center'>
            <button className='p-2 px-4 bg-inherit' onClick={e => toggleCancel(e)}>{firstButtonText}</button>
            <button type='submit' className='p-2 px-4 bg-blue-700 text-white  rounded-lg hover:bg-blue-900 transition-all ease-in-out 300ms'>{secondButtonText}</button>
          </div>
        </form>
      </div>

      <div>

      {/* {imageUrl && <img src={imageUrl} />} */}
      </div>
  </div>

  );
};

export default UserImageModal;
