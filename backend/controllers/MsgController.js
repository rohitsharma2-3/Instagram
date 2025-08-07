const Conversation = require("../models/ConversationModel");
const Message = require("../models/MessageModel");

const sendMessage = async (req, res) => {
  try {
    let senderId = req.user;
    let reciverId = req.params.id;
    let { message } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, reciverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, reciverId],
      });
    }

    let msg = new Message({
      message,
      senderId,
      reciverId,
    });

    if (msg) conversation.messages.push(msg._id);

    await Promise.all([msg.save(), conversation.save()]);

    return res.status(200).json({ Success: true, msg });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error", Success: false });
  }
};

const getMessage = async (req, res) => {
  try {
    let senderId = req.user;
    let reciverId = req.params.id;

    let conversation = await Conversation.find({
      participants: { $all: [senderId, reciverId] },
    });

    if (!conversation) res.status(200).json({ Success: true, message: [] });

    return res
      .status(200)
      .json({ Success: true, message: conversation?.messages });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error", Success: false });
  }
};

module.exports = { sendMessage, getMessage };
