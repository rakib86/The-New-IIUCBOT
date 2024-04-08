// config.js
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const botToken = process.env.BOT_TOKEN;
const express = require('express');
const githubToken = process.env.GITHUB_ACCESS_TOKEN;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const githubRepoURL = 'https://api.github.com/repos/rakib86/IIUCbot-DataBase';
const expressApp = express();
const port = process.env.PORT || 3000;

const firebaseConfig = {
    apiKey: "AIzaSyB-bER848mqiUbVXtl4l_tHl4YQ3ymNWMw",
    authDomain: "iiucbot-data.firebaseapp.com",
    projectId: "iiucbot-data",
    storageBucket: "iiucbot-data.appspot.com",
    messagingSenderId: "116795464348",
    appId: "1:116795464348:web:a5c17f709aae458e37ab59"
  };

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

module.exports = { 
    TelegramBot, 
    axios, 
    dotenv, 
    botToken, 
    express, 
    githubToken, 
    githubRepoURL, 
    expressApp,
    genAI,
    port,
    db
};