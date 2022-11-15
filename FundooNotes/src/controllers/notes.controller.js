import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/notes.service';

/* controller to create a note
@param {object} req-request object
@param{object} res-response object
@param{Function} next() */

export const createNote=async(req,res,next)=>{
    try{
        const data=await NoteService.createNote(req.body);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:data,
            message:' Note created successfully !! '
        });
    }catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            message:`${error}`
        });
    }
};

//controller to get all the notes available

export const getAllNotes=async(req,res,next)=>{
    try{
        const data=await NoteService.getAllNotes();
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:data,
            message:'All notes fetched successfully'
        });
    }catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            message:`${error}`
        });
    }
}

/* get a particualar note */
export const getNote=async(req,res,next)=>{
    try{
        const data=await NoteService.getNote(req.params._id);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:data,
            message:'note fetched successfully'
        });
    }catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            message:`${error}`
        });
    }
};

