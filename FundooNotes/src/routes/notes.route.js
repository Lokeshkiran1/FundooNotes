import express from 'express';
import * as notesController from '../controllers/notes.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { notesValidator } from '../validators/notes.validator';
const router=express.Router();

//router to create a new note
router.post('',notesValidator,userAuth,notesController.createNote);

//router to get all notes
router.get('',userAuth,notesController.getAllNotes);

//router to get a particular note by id
router.get('/:_id',userAuth,notesController.getNote);



export default router;