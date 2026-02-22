const express = require("express");
const router = express.Router();
const Link = require("../models/Link");

// Create Link
router.post("/", async (req, res) => {
  try {
    const link = await Link.create(req.body);
    res.status(201).json(link);

  } catch (error) {

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Link name already exists"
      });
    }

    res.status(400).json({
      message: "Something went wrong"
    });
  }
});

// Get All Links
router.get("/", async (req, res) => {
  const links = await Link.find().sort({ createdAt: -1 });
  res.json(links);
});

// Update Link
router.put("/:id", async (req, res) => {
  try {
    const link = await Link.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(link);

  } catch (error) {

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Link name already exists"
      });
    }

    res.status(400).json({
      message: "Update failed"
    });
  }
});

// Delete Link
router.delete("/:id", async (req, res) => {
  await Link.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

module.exports = router;
