import { NextApiRequest, NextApiResponse } from "next";

const ALLOWED_METHODS = ["POST"];

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (!req.method || !ALLOWED_METHODS.includes(req.method)) res.status(400);
  try {
    const { cityQuery } = req.body;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.RAPID_API_HOST,
      },
    };

    console.log("cityqAOP", req.body);
    const cities = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${cityQuery}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("api", response);
        return response;
      })
      .catch((err) => console.error(err));

    res.json({ cities: cities });
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
}
