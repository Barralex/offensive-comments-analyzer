const express = require("express");
const sentimentApi = require("../libs/sentiment-api");
const aposToLexForm = require("apos-to-lex-form");

const router = express.Router();

const NormalizeComment = (comment) => {
  const lexedComment = aposToLexForm(comment);
  const lowerCaseComment = lexedComment.toLowerCase();
  return lowerCaseComment;
};

router.post("/comment-analyzer", async function (req, res, next) {
  const { comment } = req.body;
  try {
    const result = await sentimentApi.getSentiment(NormalizeComment(comment));
    res.json({ score: result });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
