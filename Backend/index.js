const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const cors = require("cors");
const connectDB = require("./db");
const SearchHistory = require("./Models/SearchHistory")

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(bodyParser.json());

// OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Hardcoded Assignments
const assignments = [
  { assiNo: 1, title: "Implement depth first search and breadth first search, Use an undirected graph and develop a recursive algorithm for searching all the vertices of a graph or tree data structure" },
  { assiNo: 2, title: "Implement Breadth First Search (BFS) for an 8-Puzzle game" },
  { assiNo: 3, title: "Implement A* algorithm for any game search problem" },
  { assiNo: 4, title: "Develop an elementary chatbot for any suitable customer interaction application" },
  { assiNo: 5, title: "Implement a solution for a Constraint Satisfaction Problem using Branch and Bound and Backtracking for N-Queen problem" },
  { assiNo: 6, title: "Implement an Expert System (choose one: Information management, Hospitals, Help desk, Employee evaluation, Stock market trading, Airline scheduling)" }
];

const names = {
  "Kalyani":"Server is broken , The data is under critical thinking...",
  "Sudarshan": "😎😎😎 The Founder,Creater and Intellect of this webapp 😎😎😎",
  "Sanket": "The partner in technology ..... well known persona 😘",
  "Akshay": "The partner in technology ..... Lay tension hay re 🤦‍♂️",
  "Arnav" : "💙💙💙💙BLUE💙💙💙💙",
  "Staish" : "The partner in technology ..... aaj kay scam karu ",
  "Vedant" : "The partner in technology ..... Vedant bhaiya mitr parivar 💸💸💸"
};

const prohibitedNames = ["Om"]; // add any names you want to block

async function saveResponse(query, response) {
  try {
    const newSearch = new SearchHistory({ query, response });
    await newSearch.save();
    console.log("Saved:", newSearch);
  } catch (err) {
    console.error("Error saving:", err);
  }
}

// Function to find assignment
function findAssignment(userMessage) {
  const lowerMsg = userMessage.toLowerCase();

  // Match numbers like "assi 2"
  const numMatch = lowerMsg.match(/assi(?:gnment)?\s*(\d+)/);
  if (numMatch) {
    const num = parseInt(numMatch[1]);
    return assignments.find(a => a.assiNo === num);
  }

  // Otherwise check by keyword presence
  for (let ass of assignments) {
    if (lowerMsg.includes(ass.title.toLowerCase().split(" ")[0])) {
      return ass;
    }
  }

  return null;
}

// Chat Route
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  
  if (!userMessage) {
    return res.json({ reply: "Please provide a message." });
  }
  
  const words = userMessage.trim().split(/\s+/);

   for (let word of words) {
    const cleanWord = word.replace(/[.,!?]/g, '');
    const capitalized = cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1).toLowerCase();
    if (prohibitedNames.includes(capitalized)) {
      saveResponse(userMessage,reply);
      return res.json({ reply: ".....Sharam Karo Apka Yaha Kya Kam....." });
    }
  }


// 1️⃣ Check if any word matches a predefined name
for (let word of words) {
  const cleanWord = word.replace(/[.,!?]/g, '');
  const capitalized = cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1).toLowerCase();

  if (names[capitalized]) {
    saveResponse(userMessage);
    return res.json({ reply: `${capitalized} → ${names[capitalized]} ` });
  }
}

if (words.length === 1) {
  try {
    const aiResponse = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful tutor that provides meanings of words or names." },
        { role: "user", content: `Give the meaning of this word: ${userMessage}` }
      ],
    });
    const reply = aiResponse.choices[0].message.content;
    saveResponse(userMessage,reply);
    return res.json({ reply });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ reply: "Error generating AI response." });
  }
}

  const assignment = findAssignment(userMessage);

  try {
    let aiPrompt;

    if (assignment) {
      // Assignment found → ask AI to generate solution steps
      aiPrompt = `Explain step by step how to solve this assignment: ${assignment.title}`;
    } else {
      // Not an assignment → normal chatbot mode
      aiPrompt = userMessage;
    }

    // OpenAI Call
    const aiResponse = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful tutor chatbot that explains clearly and step by step." },
        { role: "user", content: aiPrompt }
      ],
    });

    const reply = aiResponse.choices[0].message.content;
    
    if (assignment) {
      saveResponse(userMessage,reply);
      return res.json({
        reply: `📘 *Assignment ${assignment.assiNo}*\nTitle: ${assignment.title}\n\n${reply}`,
      });
    } else {
      
      saveResponse(userMessage,reply);
      return res.json({ reply });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ reply: "Error generating AI response." });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
