import { client } from "../config/redis"

export const redisCheck=async(req,res,next)=>{
    const value=await client.get('getAllData');
    console.log("value============================>>>>>>>><<<<<<<<",value);
    if(value!==null){
        res.status(200).json({
            code:200,
            data:JSON.parse(value),
            message:'All the notes fetched successfully from redis'
        });
    }else{
        next();
    }
}