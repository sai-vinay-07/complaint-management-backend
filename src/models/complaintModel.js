const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      enum: [
        "harassment",
        "abuse",
        "fraud",
        "threat",
        "other"
      ]
    },

    status: {
      type: String,
      enum: ["SUBMITTED", "UNDER_REVIEW", "CLOSED"],
      default: "SUBMITTED"
    }

  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Complaint", complaintSchema);
