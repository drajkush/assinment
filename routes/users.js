const express = require("express");
const router = express.Router();
const user = require("../schema/userSchema");
const nodemailer = require("../mailerService/nodemailer")

/* POST users data. */
router.post("/createUserDetails", async (req, res) => {
  try {
      let useData = {
      title: req.body.title,
      resion:  req.body.resion,
      date: new Date(req.body.date)
    };
    let users = await new user(useData).save();
    res.status(200).json("Data save sucesfully")
  } catch (err) {
      res.status(400).json({
        message: err.message,
      });
  }
  
})
/* GET users data. */
router.get("/getUserDetails/:id", async (req, res) => {
  try {
    let id = req.params.id
    let users = await user.findOne({_id:id});
    if (users) {
       res.status(200).json(users)
    }   
  } catch (err) {
      res.status(400).json({
        message: err.message,
      });
  }
  
})
/* Delete users data. */
router.delete("/deleteUserDetails/:id", async (req, res) => {
  try {
    let id = req.params.id
    let users = await user.findOneAndDelete({_id:id});
    if (users) {
       res.status(200).json("users data delete sucesfully")
    }   
  } catch (err) {
      res.status(400).json({
        message: err.message,
      });
  }
  
})
/* Reschedule. */
router.put("/Reschedule/:id", async (req, res) => {
  try {
    let id = req.params.id
    let data = {
      
    }
    let users = await user.findOneAndUpdate({_id:id},req.body,{new:true});
    if (users) {
       res.status(200).json("users data update sucesfully")
    }   
  } catch (err) {
      res.status(400).json({
        message: err.message,
      });
  }
  
})

/* Send mail. */
router.post("/sendMail", async (req, res) => {
  try {
    let userMail = req.body.email
    let sendMail = await nodemailer.sendmail(userMail)
    if (sendMail == 0) {
      res.status(200).send("email send sucessfully")
    } else {
      res.send("Somthing error occure during send email")
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }


})
module.exports = router;
