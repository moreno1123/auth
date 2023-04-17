import connectDb from "@/utils/connectDb";
import { getUser, updateUser } from "@/controllers/userController";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  method: any;
  name:string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
  await connectDb();
  
  const { method } = req;
  
  switch(method){
    case 'GET':
      getUser(req, res);
      break;
    case 'PUT':
      updateUser(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(400).end(`Method ${method} not allowed`)
      break;
  }
}
