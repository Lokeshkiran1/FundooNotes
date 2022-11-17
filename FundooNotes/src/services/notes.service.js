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

//update a note 

export const updateNote=async(_id,body)=>{
    const data=await Notes.findByIdAndUpdate(
        {
            _id
        },
        body,{
            new:true
        }
    );
    return data;
};

//delete a single note
export const deleteNote=async(id)=>{
    await Notes.findByIdAndDelete(id);
    return '';
};


//archive the note and already archived then unarchive the note
export const archiveTheNote=async(_id)=>{
    const noteData=await Notes.findOne({_id:_id});
    console.log("Note data =========================>>>>>>>>>>",noteData);
    const isArchived=noteData.isArchived===true?false:true;
    const data=await Notes.findByIdAndUpdate(
        {
            _id
        },
        {isArchived:isArchived},
        {
            new:true
        }
    );
    return data;
};

//trash a note and untrash

export const trashTheNote=async(_id)=>{
    const noteData=await Notes.findOne({_id:_id});
    console.log("noteData==========================>>>>>>>>>>>",noteData);
    const isTrash=noteData.isTrash===true?false:true;
    const data=await Notes.findByIdAndUpdate(
        {
            _id
        },
        {isTrash:isTrash},
        {
            new:true
        }
    );
    return data;
};