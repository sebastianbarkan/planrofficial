import { NextApiRequest, NextApiResponse } from "next";
const { Configuration, OpenAIApi } = require("openai");

const ALLOWED_METHODS = ["POST"];

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.method || !ALLOWED_METHODS.includes(req.method)) res.status(400);
  try {
    const { dates, type, budget, location } = req.body;
    console.log("chatgpt", req.body);
    // const configuration = new Configuration({
    //   organization: "org-FbYfkdgdR47t0YlIIUZrYXsy",
    //   apiKey: "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",
    // });
    // const openai = new OpenAIApi(configuration);

    // const chatGptResponse = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: `Provide a ${budget} dollar ${type} vacation plan with exact time frames for a trip to ${location} from ${date}. In addition, after each activity, include the estimated travel time, cost and temperature. Finally, include any website links that are related to these activities.`,
    //   max_tokens: 4000,
    //   temperature: 0,
    // });
    // res.json({
    //   data: chatGptResponse.data.choices[0].text,
    // });
    res.end();
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};
