import { model, Schema } from "mongoose";

const notesSchema=new Schema(
    {
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        color:{
            type:String
        },
        isArchived:{
            type:Boolean,
            default:false
        },
        isTrash:{
            type:Boolean,
            default:false
        },
        isDeleted:{
            type:Boolean
        },
        userID:{
            type:String
        }        
    },
    {
        timestamps:true 
    }
);
export default model('Notes',notesSchema);