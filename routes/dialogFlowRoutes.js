const chatbot = require("../chatbot/chatbot");
const courses = require("../models/courses");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("hello world");
  });

  app.post("/api/df_text_query", async (req, res) => {
    let responses = await chatbot.textQuery(req.body.text, req.body.paramaters);

    res.send(responses);
  });

  app.post("/api/df_event_query", async (req, res) => {
    let responses = await chatbot.eventQuery(
      req.body.event,
      req.body.paramaters
    );
    res.send(responses);
  });

  //
  app.post("/api/text_query", async (req, res) => {
    let responses = await chatbot.textQuery(req.body.text, req.body.paramaters);

    if (
      responses[0].queryResult.intent.displayName === "Default Fallback Intent"
    ) {
      res.send({
        responses: responses,
        intentExits: false,
      });
    } else {
      const keyword =
        responses[0].queryResult.parameters.fields.course.stringValue;

      courses
        .find({
          keyword: keyword,
        }, {
          _id: 1,
          data: 1,
          type: 1,
        })
        .then((result) => {
          console.log(result);
          res.send({
            responses: result,
            intentExits: true,
          });
        })
        .catch((err) => console.log(err, "Error fetching courses"));
    }
  });
};