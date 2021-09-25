'use strict'

const config = require('../config/keys.js');
const dialogflow = require('dialogflow');
const structjson = require('./structjson.js');
const {struct} = require('pb-util');

const projectId = config.googleProjectId;
const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey
}


const sessionClient = new dialogflow.SessionsClient({
    projectId : projectId,
    credentials: credentials
});
const sessionPath = sessionClient.sessionPath(config.googleProjectId, config.dialogFlowSessionId);

  


module.exports ={
    textQuery: async function(text, paramaters = {}) {
        const request = {
            session: sessionPath,
            queryInput: {
              text: {
                // The query to send to the dialogflow agent
                text: text,
                // The language used by the client (en-US)
                languageCode: config.dialogFlowSessionLanguageCode,
              },
            },

            queryParams: {
                payload: {
                    data: paramaters
                }
            }
          };
          try {
            let responses = await sessionClient.detectIntent(request);
            const result = responses[0].queryResult;
            
            responses = await this.handleAction(responses);
            return responses;

          } catch (error) {
              return error;
          }
         
       

    },
    eventQuery: async function(event, paramaters = {}) {
        const request = {
            session: sessionPath,
            queryInput: {
              event: {
                name: event,
                paramaters:struct.encode(paramaters),
                languageCode: config.dialogFlowSessionLanguageCode,
              },
            },

          };
         
        let responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;
        
        responses = await this.handleAction(responses);
        return responses;

    },

    handleAction : function (responses){
        return responses;
    }
}