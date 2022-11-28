import { client } from "../config/redis"

export const allNotesDetails=async(req,res,next)=>{
    const arrObj=await client.get('getAllData');
    if(arrObj!==null){
        res.status(200).json({
            code:200,
            data:JSON.parse(arrObj),
            message:'All the notes fetched successfully from redis'
        });
    }else{
        next();
    }
}
export const getSingleNoteByID=async(req,res,next)=>{
    const noteDetails=await client.get('getDataByID');
    console.log("note by id ======================>>>>>>>><<<<<<<<<",noteDetails);
    if(noteDetails!==null){
        res.status(200).json({
            code:200,
            data:JSON.parse(noteDetails),
            message:'note by id is fetched successfully by redis'
        });
        console.log("note by id============>>>>>>>",noteDetails)
    }else{
        next();
    }
}