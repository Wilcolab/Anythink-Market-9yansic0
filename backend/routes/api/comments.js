const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

/**
 * GET endpoint for retrieving all comments
 * @route GET /
 * @group Comments - Operations related to comments
 * @returns {Array.<Comment>} 200 - An array of comments
 * @returns {Error} 500 - Unexpected error
 */
router.get("/", async (req, res) => {
    const comments = await Comment.find();
    res.json(comments);
});


/**
 * DELETE endpoint for deleting a comment by ID
 * @route DELETE /:id
 * @group Comments - Operations related to comments
 * @param {string} id.path.required - id of the Comment to delete
 * @returns {Object} 200 - An object with a success property
 * @returns {Object} 404 - An object with an error property indicating the comment was not found
 * @returns {Object} 500 - An object with an error property indicating a server error
 */
router.delete("/:id", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        await comment.remove();
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
