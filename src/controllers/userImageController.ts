import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";

export async function updateUserImage(req: NextApiRequest, res:NextApiResponse){
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
        "image": formData.image,
      }}
    )

    const user = await User.findById(session.sub)

    res.status(200).json({message: "User image updated.", user})

  }catch (error){
    res.status(404).json({error: "Something went wrong."})
  }
}

