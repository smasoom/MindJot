const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const fetchuser = require("../middleware/fetchUser");
const Note = require("../models/Note");

// Get all the notes  GET "/fetchallnotes"          ROUTE-1
router.get("/fetchallnotes", fetchuser, async (req, res) => {

  try {


    const notes = await Note.find({ user: req.user.id });

    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// to add a note  POST "/addnote"       login required   ROUTE-2
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body(
      "description",
      "description must have be atleast  5 characters"
    ).isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {


      const { title, description, tag } = req.body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({

        title,
        description,
        tag,
        user: req.user.id
      })
      const savedNote = await note.save()
      res.json(savedNote)

    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

// to update a note  PUT "/updatenote"       login required   ROUTE-3

router.post(
  "/updatenote/:id",
  fetchuser, async (req, res) => {
    const { title, description, tag } = req.body
    // creating a newNote object

    const newNote = {}
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

  

// find the note you want to update
let note = Note.findById(req.params.id)
if (!note) { res.status(404).send("NotFound") }
// to check whether t is the same person wants to update or any hacker
if (note.user.toString() !== req.user.id) {
  return res.status(401).send("not allowed")

}
note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })

res.json({ note })
  })

module.exports = router;
