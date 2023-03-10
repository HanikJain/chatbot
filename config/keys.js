require('dotenv').config()




module.exports = {
    googleProjectId : process.env.GOOGLE_PROJECT_ID,
    dialogFlowSessionId: process.env.DIALOGFLOW_SESSION_ID,
    dialogFlowSessionLanguageCode : process.env.DIALOGFLOW_LANGUAGE_CODE,
    googleClientEmail : process.env.GOOGLE_CLIENT_EMAIL,
    googlePrivateKey : process.env.NODE_ENV === "production" ? JSON.parse(process.env.GOOGLE_PRIVATE_KEY) : process.env.GOOGLE_PRIVATE_KEY ,
    keyFileName : process.env.KEY_FILE_NAME
}

