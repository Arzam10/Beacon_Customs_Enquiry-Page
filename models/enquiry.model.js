const mongoose = require("mongoose");

const enqSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true, // Fixed typo: 'required' instead of 'requried'
    },
    phone: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        enum: ["Andhra Pradesh",
            "Arunachal Pradesh",
            "Assam",
            "Bihar",
            "Chhattisgarh",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal Pradesh",
            "Jammu and Kashmir",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Madhya Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil Nadu",
            "Telangana",
            "Tripura",
            "Uttarakhand",
            "Uttar Pradesh",
            "West Bengal",
            "Andaman and Nicobar Islands",
            "Chandigarh",
            "Dadra and Nagar Haveli",
            "Daman and Diu",
            "Delhi",
            "Lakshadweep",
            "Puducherry"],


    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    vehicleMake: {
        type: String,
        enum: ["Bike", "Car"],
        required: true,
    },
    vehicleBrand: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {

                if (this.vehicleMake === "Bike") {
                    return [
                        "Hero", "Yamaha", "Honda", "Bajaj", "Suzuki", "Royal Enfield"
                    ].includes(value);
                }


                if (this.vehicleMake === "Car") {
                    return [
                        "Toyota", "Honda", "Ford", "BMW", "Mercedes"
                    ].includes(value);
                }


                return false;
            },
            message: "Invalid vehicle model for the selected vehicle make"
        }
    },
    vehiclename: {
        type: String,
        required: true
    },
    year: {
        type: String,
        enum: [
            "2025",
            "2024",
            "2023",
            "2022",
            "2021",
            "2020",
            "2019",
            "2018",
            "2017",
            "2016",
            "2015",
            "2014",
            "2013",
            "2012",
            "2011",
            "2010",
            "2009",
            "2008",
            "2007",
            "2006",
            "2005",
            "2004",
            "2003",
            "2002",
            "2001",
            "2000",
            "Below 2000"
        ]

    },
    Services: {
        type: String,
        enum: ["Colour change",
            "Wrapping",
            "Modification",
            "Headlight / Taillight Customization",
            "Restoration",
            "Mechanical / Engine Work",
            "Detailing / High Gloss Treatment ",
            "Ceramic Coating ",
            "PPF Lamination ( Paint Protection Film )"

        ],
        required: true,
    },

    howdidyouhearaboutuse: {
        type: String,
        enum: ["facebook", "Instagram", "Facebook", "Google", "Through A Friend", "Other"]
    },

    comments: {
        type: String
    }


},);

module.exports = mongoose.model("Enquiry", enqSchema);
