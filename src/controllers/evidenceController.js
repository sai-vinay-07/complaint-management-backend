const Complaint = require("../models/complaintModel");
const Evidence = require("../models/evidenceModel");

const uploadEvidence = async (req, res) => {
  try {

    const { complaintId } = req.body;
    const file = req.file;
    const userId = req.user.id;

    if (!complaintId) {
      return res.status(400).json({
        message: "Complaint ID required"
      });
    }

    if (!file) {
      return res.status(400).json({
        message: "Evidence file is required"
      });
    }

    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    if (complaint.userId.toString() !== userId) {
      return res.status(403).json({
        message: "Not allowed to upload evidence for this complaint"
      });
    }

    let fileType = "document";

    if (file.mimetype.startsWith("image")) fileType = "image";
    else if (file.mimetype.startsWith("video")) fileType = "video";
    else if (file.mimetype.startsWith("audio")) fileType = "audio";

    const evidence = await Evidence.create({
      complaintId,
      userId,
      fileUrl: `/uploads/${file.filename}`,
      fileType
    });

    return res.status(201).json({
      message: "Evidence uploaded successfully",
      evidence
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};


const getUserEvidence = async (req, res) => {
  try {
    const evidenceList = await Evidence.find({
      userId: req.user.id
    });

    if (evidenceList.length === 0) {
      return res.status(404).json({
        message: "No evidence found"
      });
    }

    res.status(200).json({ evidenceList });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getEvidence = async (req, res) => {
  try {

    const evidence = await Evidence.findById(req.params.id)

    if (!evidence) {
      return res.status(400).json({
        message: "Evidence Not Found"
      })
    }

    return res.status(200).json({
      evidence
    })

  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


module.exports = { uploadEvidence, getEvidence, getUserEvidence }