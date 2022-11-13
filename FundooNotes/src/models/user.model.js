import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    FirstName : {
      type: String,
    },
    LastName: {
      type: String
    },
    EmailID: {
      type: String,
      unique:true
    },
    Password: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);
