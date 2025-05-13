import dotenv from 'dotenv';

dotenv.config()

import express from 'express';
import OpenAI from 'openai';



const router = express.Router();
 // Grabs OpenAI key to send a response to GPT-3.5-turbo
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
 // Prompt for simulation 
const generateMatchupPrompt = (player1: any, player2: any) => {
    return `
    You are a basketball simulation engine.

    Simulate a realistic 1v1 game between the following two basketball players:

    Player 1:
    Name: ${player1.name}
    Height: ${player1.height}
    Weight: ${player1.weight}
    ThreePoint: ${player1.threePoint}
    FieldGoal: ${player1.fieldGoal}
    Defense: ${player1.defense}
    Position: ${player1.position}

    Player 2:
    Name: ${player2.name}
    Height: ${player2.height}
    Weight: ${player2.weight}
    ThreePoint: ${player2.threePoint}
    FieldGoal: ${player2.fieldGoal}
    Defense: ${player2.defense}
    Position: ${player2.position}

    Consider the following in your simulation:
- Offensive and defensive strengths
- Speed, strength, agility, and basketball IQ
- Shooting ability, handles, and post game
- How their playstyles would clash
- Mentality and clutch factor
- If one player is clearly less skilled, have the player lose badly to the other

Simulate a game to 11 (ones and twos, win by 2). Output:
1. Final Score
2. Game Highlights
3. Key Moments
4. Who wins and why

Limit response to no more than 150 words.

Make it exciting, like a sportswriter wrote it.
`; 
};

// Request and Response from OpenAI, throw error if not response is given, model of AI, tell AI to use prompt as well.
router.post('/simulate', async (req, res) => {
    const { player1, player2 } = req.body;
  
    const prompt = generateMatchupPrompt(player1, player2);
  
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      });
  
      const result = completion.choices[0].message?.content;
      res.json({ result });
    } catch (err) {
      console.error('Simulation error:', err);
      res.status(500).json({ error: 'Simulation failed' });
    }
  });
  
  export default router;