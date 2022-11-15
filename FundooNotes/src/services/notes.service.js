import Notes from '../models/notes.model';

//create a new note
export const createNote=async(body)=>{
    const data=await Notes.create(body);
    return data;
};

//get all notes available
export const getAllNotes=async()=>{
    const data=await Notes.find();
    return data;
}

//get a note by id

export const getNote=async(_id)=>{
    const data=await Notes.findOne({_id:_id});
    return data;
};