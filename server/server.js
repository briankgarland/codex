import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// const GPT_4_API_ENDPOINT = 'https://api.openai.com/v1/engines/gpt-4/completions';
const GPT_4_API_ENDPOINT = 'https://codex-idhx.onrender.com';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!',
  });
});

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await axios.post(
      GPT_4_API_ENDPOINT,
      {
        prompt: `${prompt}`,
        temperature: 0.7,
        max_tokens: 8000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      },
    );

    res.status(200).send({
      bot: response.data.choices[0].text,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send(error || 'Something went wrong');
  }
});

app.listen(5000, () => console.log('AI server started on https://codex-idhx.onrender.com'));
