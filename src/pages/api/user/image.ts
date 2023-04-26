import connectDb from "@/utils/connectDb";
import { updateUserImage } from "@/controllers/userImageController";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  method: any;
  name:string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
  await connectDb();
  
  const { method } = req;
  
  switch(method){
    case 'PUT':
      updateUserImage(req, res);
      break;
    default:
      res.setHeader('Allow', ['PUT'])
      res.status(400).end(`Method ${method} not allowed`)
      break;
  }
}
