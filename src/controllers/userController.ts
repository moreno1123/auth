import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";

export async function getUser(req: NextApiRequest, res:NextApiResponse){
  const session:any = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  
  try{
    
    const user = await User.findById(session.sub)
    res.status(200).json({user})

  }catch (error){
    res.status(404).json({error: "Something went wrong."})
  }
}

export async function updateUser(req: NextApiRequest, res:NextApiResponse){
  const session:any = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  try{
    
    const formData = req.body
    
    await User.findByIdAndUpdate(
      session.sub, 
      {$set: {
        "name": formData.name,
      }}
    )

    const user = await User.findById(session.sub)

    res.status(200).json({message: "User updated.", user})

  }catch (error){
    res.status(404).json({error: "Something went wrong."})
  }
}

