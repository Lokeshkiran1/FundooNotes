import express from 'express';
import * as notesController from '../controllers/notes.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { notesValidator } from '../validators/notes.validator';
const router=express.Router();

//router to create a new note
router.post('',notesValidator,userAuth,notesController.createNote);

//router to get all notes
router.get('/allNotes',userAuth,notesController.getAllNotes);

//router to get a particular note by id
router.get('/:_id',userAuth,notesController.getNote);

//router to update the note
router.put('/color/:_id',userAuth,notesController.updateNote);

//router to delete a note
router.delete('/delete/:_id',userAuth,notesController.deleteNote);

//router to archieve a note
router.post('/:_id/archive',userAuth,notesController.archiveTheNote);

//router to trash a note
router.post('/:_id/trash',userAuth,notesController.trashTheNote);

export default router;