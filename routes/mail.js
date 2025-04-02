require("dotenv").config();
const express = require("express");

const mailrouter = express.Router();
const transporter = require("../nodemailer/mail"); // Import transporter
const User = require("../models/enquiry.model"); // Import MongoDB model

// Route to send an email with MongoDB data
mailrouter.get("/send-email", async (req, res) => {
  try {
    const user = await User.findOne().sort({ _id: -1 }); // Fetch all user from MongoDB

    if (!user) {
      return res.status(404).send("No new entries found in the database.");
    }

    // Format user data for the email
    const emailContent = `
            Name: ${user.name}, 
            Email: ${user.email}, 
            Service Required: ${user.Services},
            Phone Number: +91${user.phone},
            State: ${user.state},
            City:${user.city},
            Pincode:${user.pincode},
            Vehicle Type :${user.vehicleMake},
            Vehicle Brand : ${user.vehicleBrand},
            Vehicle Registration Number : ${user.vehiclename},
            Year of Manufacturing : ${user.year},
            I heard about Beacon Customs through ${user.howdidyouhearaboutuse},
            Comment : ${user.comments}`;

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // ✅ Replace with your Gmail
      to: "momidkhanmohd@gmail.com", // ✅ Replace with recipient email
      subject: "New Enquiry for Beacon Customs",
      text: `Here are the latest form submissions:\n\n${emailContent}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

module.exports = mailrouter;
