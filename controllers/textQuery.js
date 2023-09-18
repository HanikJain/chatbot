const fs = require('fs');

const chatbot = require("../chatbot/chatbot");
const courses = require("../models/courses");
const analytics = require("../models/analytics");

const findKeyword = require("../controllers/findKeyword");

async function textQuery(req, res, next) {
    const responses = await chatbot.textQuery(req.body.text, req.body.paramaters);

    console.log(responses[0].queryResult.parameters.fields, "logs");

    if (responses[0].queryResult.intent.displayName === "Default Fallback Intent") {

      res.send({
        responses: responses,
        intentExits: false,
      });

    } else {
        const keywords = findKeyword(responses)
        let data = [];

        console.log(keywords)
        try {

            for (let keyword of keywords) {
                const result = await courses.find({ keyword: keyword}, { _id: 1, data: 1, type: 1});
                data = [...data, ...result];
            }

            const obj = {
                data: data
            };
            const json = JSON.stringify(obj);

            try {
                fs.writeFile('./store/data.json', json, 
                {
                    encoding: "utf8",
                    flag: "w",
                }, (err) => {

                    if(err) throw new Error(err);

                    res.status(201).json({
                        responses: data,
                        intentExits: true,
                    });
                })

            } catch (err) {
                console.log(err, "Error saving data in json");
                if(err) throw new Error(err);
            }


        } catch (err) {
            console.log(err, "Error fetching data");
            throw new Error(err);
        }
            
    }

}


module.exports = textQuery;