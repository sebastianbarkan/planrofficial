import { NextApiRequest, NextApiResponse } from "next";
const { Configuration, OpenAIApi } = require("openai");

const ALLOWED_METHODS = ["POST"];

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const configuration = new Configuration({
    organization: "org-FbYfkdgdR47t0YlIIUZrYXsy",
    apiKey: "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",
  });

  const openai = new OpenAIApi(configuration);
  const { date, type, budget, location } = req.body;

  const chatGptResponse = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Provide a ${budget} dollar ${type} vacation plan with exact time frames for a trip to ${location} from ${date}. In addition, after each activity, include the estimated travel time, cost and temperature. Finally, include any website links that are related to these activities.`,
    max_tokens: 4000,
    temperature: 0,
  });

  res.json({
    data: chatGptResponse.data.choices[0].text,
  });
};
