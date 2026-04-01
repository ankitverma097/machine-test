import User from "../models/User.js";
import { isAdult, validateFileType } from "../utils/validator.js";

export const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      dob,
      residentialAddress,
      permanentAddress,
      sameAsResidential,
      fileTypes 
    } = req.body;

    if (!isAdult(dob)) {
      return res.status(400).json({ message: "User must be 18+" });
    }

    // File validation
    const files = req.files;

    if (!files || files.length < 2) {
      return res.status(400).json({ message: "Minimum 2 documents required" });
    }

    const documents = files.map((file, index) => {
      const fileType = fileTypes[index];

      if (!validateFileType(fileType, file.mimetype)) {
        throw new Error("Invalid file type");
      }

      return {
        fileName: file.originalname,
        fileType,
        fileUrl: file.path
      };
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      dob,
      residentialAddress,
      permanentAddress: sameAsResidential ? residentialAddress : permanentAddress,
      sameAsResidential,
      documents
    });

    res.status(201).json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};