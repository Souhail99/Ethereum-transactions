// Import required Next.js types for API handling
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse 
) {
  if (req.method == "POST") {

    // Define the Chainbase API key
    const CHAINBASE_API_KEY = "2T5CivcPchJYkyEq5B9wSpAaMG1";

    // Fetch token balances from the Chainbase API based on the provided parameters
    const Allbalances = await fetch(`https://api.chainbase.online/v1/account/tokens?chain_id=1&address=${req.body.Address}&to_block=${req.body.BlockNumber}`, {
      method: 'GET',
      headers: {
        'x-api-key': CHAINBASE_API_KEY, // Set the API key in the request header
        'accept': 'application/json',
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      mode: 'no-cors' // Set the CORS mode to "no-cors"
    });


    const data = await Allbalances.json();
    const tokenList = data.data;
    const tokenBalances = [];

    for (var i = 0; i < tokenList.length; i++) {
      tokenBalances.push({
        name: tokenList[i].name,
        symbol: tokenList[i].symbol,
        balance: parseInt(tokenList[i].balance, 16) / 10 ** 18, // Convert the hexadecimal balance to decimal
      });
    }

    // Send a JSON response with the tokenBalances array
    res.status(200).send({ tokenBalances: tokenBalances });

  } else {
    res.status(200).json({ name: 'John Doe' });
  }
}