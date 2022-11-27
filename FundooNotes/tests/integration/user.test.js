import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';
import { token } from 'morgan';
import { note } from '@hapi/joi/lib/base';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });
  var AuthToken;
  var noteId;
  var forgotPasswordToken;


  //1.----Test case for user registration

  describe('UserRegistration', () => {
    const inputBody={
      "FirstName":"Naveen",
      "LastName":"kumar",
      "EmailID":"naveenkumar@gmail.com",
      "Password":"naveen"
    }
    it('user details should be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  //2.=------Test case for invalid FirstName
  describe('UserRegistration', () => {
    const inputBody={
      "FirstName":"N",
      "LastName":"kumar",
      "EmailID":"naveenkumar@gmail.com",
      "Password":"naveen"
    }
    it('firstname should be more than 4 characters', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(inputBody)
        .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
     });
  });
  //3.========test case for unique Email ID
  describe('UserRegistration', () => {
  const inputBody={
    "FirstName":"Naveen",
    "LastName":"kumar",
    "EmailID":"naveenkumar@gmail.com",
    "Password":"naveen"
  }
  it('email id is already registered should use different', (done) => {
    request(app)
      .post('/api/v1/users/register')
      .send(inputBody)
      .end((err, res) => {
      expect(res.statusCode).to.be.equal(500);
      done();
    });
   });
  });

   //4.=====Test case for required fields

  describe('UserRegistration', () => {
    const inputBody={
      "FirstName":"Naveen",
      "LastName":"kumar",
      "EmailID":"",
      "Password":"naveen"
    }
    it('email id is should required', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(inputBody)
        .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
    });
  });

  //5.test case for invalid password
  
  describe('UserRegistration', () => {
    const inputBody={
      "FirstName":"Naveen",
      "LastName":"kumar",
      "EmailID":"naveenkumar@gmail.com",
      "Password":"nav"
    }
    it('password should be more than 4 characters', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(inputBody)
        .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
     });
  });

  //6.Test case for valid user login

  describe('UserLogin', () => {
    const inputBody={
      "EmailID":"naveenkumar@gmail.com",
      "Password":"naveen"
      
    }
    it('user should be logged in', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          AuthToken=res.body.data;
          console.log("token====================================================>",token)
        expect(res.statusCode).to.be.equal(200);
        done();
      });
     });
  });

  //7.Test case for not a registered Email ID

  describe('UserLogin', () => {
    const inputBody={
      "EmailID":"naveenkumar123@gmail.com",
      "Password":"naveen"
    }
    it('should through error about user is not registered', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
     });
  });

  //8.Test case for invalid password
  describe('UserLogin', () => {
    const inputBody={
      "EmailID":"naveenkumar@gmail.com",
      "Password":"naveen123"
    }
    it('should through error invalid password', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
     });
  });

  //9.TestCAse both invalid password and email

  describe('UserLogin', () => {
    const inputBody={
      "EmailID":"naveenkumar123@gmail.com",
      "Password":"naveen123"
    }
    it('should through error invalid email id', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
     });
  });

  //10. Test case for required password

  describe('UserLogin', () => {
    const inputBody={
      "EmailID":"naveenkumar@gmail.com",
      "Password":""
    }
    it('password should be required', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
     });
  });

  ////11. Test case to create a new note with valid user

  describe('creating new note',()=>{
    const inputBody={
      "title":"note123",
      "description":"new note 123"
    }
    it('note created successfully',(done)=>{
      request(app)
      .post('/api/v1/notes')
      .set('Authorization',`Bearer ${AuthToken}`)
      .send(inputBody)
      .end((err,res)=>{
        noteId=res.body.data._id;
        console.log("note id ==============================>>>>>>>",noteId);
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
  });

  ////12. Test case to create a new note with valid user

  describe('creating new note',()=>{
    const inputBody={
      "title":"note:abc",
      "description":"note: abc abc"
    }
    it('note created successfully',(done)=>{
      request(app)
      .post('/api/v1/notes')
      .set('Authorization',`Bearer ${AuthToken}`)
      .send(inputBody)
      .end((err,res)=>{
        //console.log(res.body);
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
  });

  //13. test case to create a new note without title with valid user
  describe('creating new note',()=>{
    const inputBody={
      "title":"",
      "description":"new note 123"
    }
    it('title should be required',(done)=>{
      request(app)
      .post('/api/v1/notes')
      .set('Authorization',`Bearer ${AuthToken}`)
      .send(inputBody)
      .end((err,res)=>{
        expect(res.statusCode).to.be.equal(400);
        done();
      });
    });
  });

  //14.Test case to get all the notes of valid user
  describe('all the notes of the user',()=>{
    it('notes fetched successfully',(done)=>{
      request(app)
      .get('/api/v1/notes/allNotes')
      .set('Authorization',`Bearer ${AuthToken}`)
      .end((err,res)=>{
        //console.log(res.body);
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
  });

  ////15. Test case to get a particular note with valid user with note id
  describe('getting the note of particular user with note ID',()=>{
    it('note fetched successfully',(done)=>{
      request(app)
      .get(`/api/v1/notes/${noteId}`)
      .set('Authorization',`Bearer ${AuthToken}`)
      .end((err,res)=>{
        console.log(res.body);
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
  });

  //16. test case to update the note of particular user
  describe('updating the note',()=>{
    const inputBody={
      "color":"green"
    }
    it('note updated successfully',(done)=>{
      request(app)
      .put(`/api/v1/notes/color/${noteId}`)
      .set('Authorization',`Bearer ${AuthToken}`)
      .send(inputBody)
      .end((err,res)=>{
        //noteId=res.body.data._id;
        expect(res.statusCode).to.be.equal(202);
        done();
      });
    });
  });
  //17.Test case to delete the particular user note by id
  describe('deleting the note of particular user using id',()=>{
    console.log("note id in delete =====================================>>>>>",noteId);
    it('given id of note of the user should be deleted successfully',(done)=>{
      request(app)
      .delete(`/api/v1/notes/delete/${noteId}`)
      .set('Authorization',`Bearer ${AuthToken}`)
      .end((err,res)=>{
        //console.log(res.body);
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
  });

  //18.Test case to forgot password with valid user
  describe('forgotPassword', () => {
    const inputBody={
      "EmailID":"naveenkumar@gmail.com"
    }
    it('user should be display valid user and mail sent', (done) => {
      request(app)
        .post('/api/v1/users/forgotPassword')
        .send(inputBody)
        .end((err, res) => {
          forgotPasswordToken=res.body.data;
          console.log("token====================================================>",forgotPasswordToken)
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
  });

  //19.Test case to forgot password with invalid user
  describe('forgotPassword', () => {
    const inputBody={
      "EmailID":"lokesh@gmail.com"
    }
    it('user should be display valid user and mail sent', (done) => {
      request(app)
        .post('/api/v1/users/forgotPassword')
        .send(inputBody)
        .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
    });
  });

  //20.Test case to reset password with authorised user
  describe('resetPassword',()=>{
    const inputBody={
      "Password":"naveen123"
    }
    it('user password should be reset',(done)=>{
      request(app)
      .put('/api/v1/users/resetPassword')
      .send(inputBody)
      .set('Authorization',`Bearer ${forgotPasswordToken}`)
      .end((err,res)=>{
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
  });

  //21.Test case for reset password without authorization
  describe('resetPassword',()=>{
    const inputBody={
      "Password":"naveen123"
    }
    it('user password should be reset',(done)=>{
      request(app)
      .put('/api/v1/users/resetPassword')
      .send(inputBody)
      .end((err,res)=>{
        expect(res.statusCode).to.be.equal(401);
        done();
      });
    });
  });
});





