const Complaint = require("../models/complaintModel");

const createComplaint = async (req, res) => {
  try {
    const { description, category } = req.body;

    if (!description || !category) {
      return res.status(400).json({
        message: "Description and category are required"
      });
    }

    const complaint = await Complaint.create({
      userId: req.user.id,
      description,
      category
    });

    return res.status(201).json({
      message: "Complaint submitted successfully",
      complaint
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    if (complaints.length === 0) {
      return res.status(404).json({
        message: "No complaints found"
      });
    }

    return res.status(200).json({
      count: complaints.length,
      complaints
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

const getUserComplaints = async (req, res) => {
  try {
    const id = req.params.id;

    const userComplaint = await Complaint.find({ userId: id });

    if (userComplaint.length === 0) {
      return res.status(404).json({
        message: "No complaints found"
      });
    }

    return res.status(200).json({
      count: userComplaint.length,
      userComplaint
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};


const getAllComplaints = async (req,res)=>{
    try {

        const allComplaints = await Complaint.find({ })
        
        if (allComplaints.length === 0) {
             return res.status(404).json({ message: "No complaints found" })
            }
        
        return res.status(200).json({
            count: allComplaints.length,
            allComplaints
        })
    } 
     catch (error) {
         console.error(error);
         return res.status(500).json({
               message: "Internal server error"
            });
    }
}
module.exports = { createComplaint,getMyComplaints,getUserComplaints,getAllComplaints };
