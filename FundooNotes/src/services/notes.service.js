import { id } from '@hapi/joi/lib/base';
import { cli } from 'winston/lib/winston/config';
import { client } from '../config/redis';
import Notes from '../models/notes.model';

//create a new note
export const createNote=async(body)=>{
    await client.del('getAllNotesDetails');
    const data=await Notes.create(body);
    return data;
};

//get all notes 
export const getAllNotes=async(userID)=>{
    const getAllData=await Notes.find({userID:userID});
    await client.set('getAllNotesDetails',JSON.stringify(getAllData));
    return getAllData;
}

//get a note by id

export const getNote=async(_id,userID)=>{
    await client.del('getDataByID')
    const getNoteByID=await Notes.findOne({_id:_id,userID:userID});
    await client.set('getDataByID',JSON.stringify(getNoteByID))
    return getNoteByID;
};

//update a note 

export const updateNote=async(_id,body,userID)=>{
    await client.del('getAllNotesDetails')
    const data=await Notes.findOneAndUpdate(
        {
            _id:_id,userID:userID
        },
        body,{
            new:true
        }
    );
    console.log("update service ===================>>>>>>>>>",data);
    return data;
};

//delete a single note
export const deleteNote=async(_id,userID)=>{
    await client.del('getAllNotesDetails')
    console.log(_id);
    console.log("user id=================>>>>>>>>>>>",userID);
    await Notes.findOneAndDelete({_id:_id,userID:userID});
    return '';
};


//archive the note and already archived then unarchive the note
export const archiveTheNote=async(_id,userID)=>{
    const noteData=await Notes.findOne({_id:_id,userID:userID});
    console.log("Note data =========================>>>>>>>>>>",noteData);
    const isArchived=noteData.isArchived===true?false:true;
    const data=await Notes.findOneAndUpdate(
        {
            _id:_id,userID:userID
        },
        {isArchived:isArchived},
        {
            new:true
        }
    );
    return data;
};

//trash a note and untrash

export const trashTheNote=async(_id,userID)=>{
    const noteData=await Notes.findOne({_id:_id,userID:userID});
    console.log("noteData==========================>>>>>>>>>>>",noteData);
    const isTrash=noteData.isTrash===true?false:true;
    const data=await Notes.findOneAndUpdate(
        {
            _id:_id,userID:userID
        },
        {isTrash:isTrash},
        {
            new:true
        }
    );
    return data;
};