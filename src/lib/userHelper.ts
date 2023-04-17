import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL;

export async function getUser(){

  const data = await axios.get(`${BASE_URL}/api/user`)
    .then((res:any) => {
      const data = res.data;
      return data;
    }).catch((error:any) => {
      return error;
    })

  return data;

}

export async function updateUser(formData:any){

  const data = await axios.put(`${BASE_URL}/api/user`, formData, {
    headers: {
    'Content-Type': 'application/json'
    }  
  })
  .then((res:any) => {
    const data = res.data;
    return data;
  }).catch((error:any) => {
    return error;
  })

  return data;

}


