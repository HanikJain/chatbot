const chatbot = require('../chatbot/chatbot');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send("hello world")
    })
    
    app.post('/api/df_text_query', async (req, res) => {
      let responses = await chatbot.textQuery(req.body.text, req.body.paramaters);
      res.send(responses);
    })

    app.post('/api/df_event_query', async (req, res)=>{
        let responses = await chatbot.eventQuery(req.body.event, req.body.paramaters);
      res.send(responses);
    })
}