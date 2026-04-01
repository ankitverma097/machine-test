import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    enum: ["image", "pdf"],
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  }
});

const addressSchema = new mongoose.Schema({
  street1: String,
  street2: String
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true , trim: true },
  lastName: { type: String, required: true , trim: true},
  email: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  trim: true,
  match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
},
  dob: { type: Date, required: true },

  residentialAddress: {
    type: addressSchema,
    required: true
  },

  permanentAddress: {
    type: addressSchema
  },

  sameAsResidential: {
    type: Boolean,
    default: false
  },

  documents: {
    type: [documentSchema],
    validate: [arr => arr.length >= 2, "Minimum 2 documents required"]
  }

}, { timestamps: true });

export default mongoose.model("User", userSchema);