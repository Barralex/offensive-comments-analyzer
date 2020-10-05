const language = require("@google-cloud/language");

const languageClient = new language.LanguageServiceClient();

module.exports.getSentiment = async function getSentiment(text) {
  const document = {
    content: text,
    type: "PLAIN_TEXT",
    languaje: "EN",
  };

  const [result] = await languageClient.analyzeSentiment({
    document: document,
  });

  const sentiment = result.documentSentiment;
  return sentiment.score;
};
