const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chat.controller");
const auth = require("../middlewares/auth");

router.get("/getAllChats", auth, chatController.getAllChats);
router.post("/createChat", auth, chatController.createChat);

router.post("/getNews", auth, chatController.getNews);

module.exports = router;
