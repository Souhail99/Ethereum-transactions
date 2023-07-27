import { NextApiRequest, NextApiResponse } from 'next';
import { spawn } from 'child_process';

// Function to run the Python script
function runPythonScript(block: number, address: string, sens: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Replace 'python' with the appropriate command to run a Python script based on your machine.
    // For example, it could be 'python3' or 'bin/python' depending on your setup.
    const pythonCommand = 'python';
    // Replace the path with the actual path to the pythonScript.py file on your machine.
    const pythonScriptPath = 'C:/Users/Souha/Downloads/origintrail/ethereum-transactions/components/pythonScript.py';
    const pythonProcess = spawn(pythonCommand, [pythonScriptPath, block.toString(), address, sens]);

    let scriptOutput = '';

    pythonProcess.stdout.on('data', (data) => {
      scriptOutput += data.toString();
    });

    pythonProcess.stderr.on('data', (error) => {
      console.error(error.toString());
      reject("An error occurred while executing the Python script.");
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve(scriptOutput);
      } else {
        reject("An error occurred while executing the Python script.");
      }
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {

    console.log(req.body.address + req.body.number + req.body.option);

    try {
      // Call the runPythonScript function with the provided parameters
      const scriptOutput = await runPythonScript(req.body.address, req.body.number, req.body.option);
      console.log("Le retour :", scriptOutput.toString());
      res.status(200).send({ data: scriptOutput });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }

  }
}