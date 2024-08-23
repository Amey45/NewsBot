const Chat = require("../models/chat.model");
const Message = require("../models/message.model");
const dotenv = require("dotenv");
dotenv.config();
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NewsApi_api_key);

exports.getAllChats = async (req, res, next) => {
  await Chat.find({ userId: req.userId })
    .exec()
    .then((chats) => {
      res.status(200).send(chats);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ err: err, message: "Error fetching chats or User not valid" });
    });
};

exports.createChat = async (req, res, next) => {
  let query = req.body.query;
  let userId = req.userId;

  let createdAt = new Date();

  let newChat = new Chat({
    query: query,
    userId: userId,
    createdAt: createdAt,
  });

  try {
    const response = await newChat.save();
    res.status(200).json({
      message: "topic stored successfully",
      chat: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "error creating chat",
      error: error,
    });
  }
};

exports.getNews = async (req, res, next) => {
  const userId = req.userId;
  const query = req.body.query;


  try {
    const response = await newsapi.v2.everything({
      q: query,
      language: "en",
      sortBy: "popularity",
      pageSize: 20,
      page: 1,
    });

    res.status(200).json({
      articles: response.articles,
      message: "news fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "error fetching news articles",
      error: error,
    });
  }
};