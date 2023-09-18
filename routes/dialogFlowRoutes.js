const fs = require('fs');

const chatbot = require("../chatbot/chatbot");
const courses = require("../models/courses");
const analytics = require("../models/analytics");
const textQuery = require("../controllers/textQuery")
const options = require("../controllers/options");


module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("hello world");
  });

  app.post("/api/df_text_query", async (req, res) => {
    const responses = await chatbot.textQuery(req.body.text, req.body.paramaters);

    res.send(responses);
  });

  app.post("/api/df_event_query", async (req, res) => {

    try {
      const responses = await chatbot.eventQuery(
        req.body.event,
        req.body.paramaters
      );

        try {
          
          await analytics.updateOne({id: 1}, {$inc: {interaction_count: 1}});

        } catch (error) {
            console.log(error, "Error in mongoDB");
        }
      
        console.log(responses, "response")
        res.send({
          responses:responses,
          api: "/api/text_query",
        });
      
    } catch (error) {
        console.log(error, "error");
    }

   
  });

  //
  app.post("/api/text_query", textQuery);

  app.post("/api/options", options);
};