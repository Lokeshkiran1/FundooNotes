import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

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

  //Test case for required password

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

});


