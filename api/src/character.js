const util = require('./util');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Schema = mongoose.Schema;


const InsanitySchema = new Schema({
    room:Number,
    current:Number
});

const Gear = mongoose.model('Gear', UserSchema);


// class Character{

//   constructor(
//       private level:number=1,
//       private sport:Sports,
//       private insanity:Insanity
//   ) {}

//   play(){
//     this.insanity.increment()
//   }
//   // TODO 24 hours reset insanity
//   reset(){
//   }
// }


class Insanity{
  constructor(
      private room:number = 10,
      private current:number = 0
  ) {}
  reset(){
    this.current = 0;
  }
  increment(){
    this.current++;
  }
  addRoom(amount:number){
    this.room += amount;
  }
  getLevel(){
    return Math.floor(this.room/10)
  }
}


router.get('/', util.isLoggedIn, (req, res) => {
    res.send('Success')
    console.log(req.user)
})


module.exports.Routes = router;