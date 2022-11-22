import { cast } from '@hapi/joi/lib/base';
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

//controller to get all the notes available for a particular user

export const getAllNotes=async(req,res,next)=>{
    try{
        
        const data=await NoteService.getAllNotes(req.body.userID);
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

/* get a particualar note of the user*/
export const getNote=async(req,res,next)=>{
    try{
        const data=await NoteService.getNote(req.params._id,req.body.userID);
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

/* update the note by id and user id */

export const updateNote=async(req,res,next)=>{
    try{
        const data=await NoteService.updateNote(req.params._id,req.body,req.body.userID);
            res.status(HttpStatus.ACCEPTED).json({
                code:HttpStatus.ACCEPTED,
                data:data,
                message:'note updated successfully'
            });
       
    }catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            message:'enter the correct note id'
        });
    }
};

/*delete the note*/

export const deleteNote=async(req,res,next)=>{
    try{
        await NoteService.deleteNote(req.params._id,req.body.userID);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:[],
            message:'note deleted successfully'
        });
    }catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            message:'note not found'
        });
    }
};

//Controller to archive note

export const archiveTheNote=async(req,res)=>{
    try{
        const data=await NoteService.archiveTheNote(req.params._id,req.body.userID);
            res.status(HttpStatus.ACCEPTED).json({
                code:HttpStatus.ACCEPTED,
                data:data,
                message:'note archived successfully'
            });
    }catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            message:'enter the correct note id'
        });
    }
};

//controller to trash note

export const trashTheNote=async(req,res)=>{
    try{
        const data=await NoteService.trashTheNote(req.params._id,req.body.userID);
        res.status(HttpStatus.ACCEPTED).json({
            code:HttpStatus.ACCEPTED,
            data:data,
            message:'note trashed successfully'
        });
    }catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            message:'enter the correct id'
        });
    }
};



