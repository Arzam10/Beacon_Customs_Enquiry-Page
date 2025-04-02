const express=require("express")
const router=express.Router()
const Enquiry=require("../models/enquiry.model");
const mailrouter = require("./mail");

router.post("/", async (req, res) => {
    try {
      console.log("Request body:", req.body); // Log the incoming data
  
      const newEnquiry = new Enquiry({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        state: req.body.state,
        city: req.body.city,
        pincode: req.body.pincode,
        vehicleMake: req.body.vehicleMake,
        vehicleBrand: req.body.vehicleBrand,
        vehiclename: req.body.vehiclename,
        year: req.body.year,
        Services: req.body.Services,
        howdidyouhearaboutuse: req.body.howdidyouhearaboutuse,
        comments: req.body.comments,
      });
  
      // Save the enquiry to the database
      await newEnquiry.save();
  
      console.log("Saved Enquiry:", newEnquiry); // Log the saved object
      const {name,email,Services}=newEnquiry
      
    res.redirect("http://localhost:9000/mail/send-email")
      console.log("sent")

    } catch (err) {
      console.log("Error saving enquiry:", err);  // Log any errors
      res.status(500).send("Error saving enquiry");
    }
  });
  

module.exports=router