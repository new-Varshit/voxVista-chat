const db = require('../data/database');
const bcrypt = require('bcryptjs');
const mongodb = require('mongodb');
class User 
{
    constructor(username,email,password){
          this.userName = username
          this.email = email
          this.password = password
    }

    async save(){
       const password = await bcrypt.hash(this.password,12);
        await db.getDb().collection('users').insertOne({
               userName : this.userName,
               email : this.email,
               password : password
          });
    }
  static async checkUser(email){
      const result =   await db.getDb().collection('users').findOne({email:email});
      return result;
    }
};

module.exports = User;