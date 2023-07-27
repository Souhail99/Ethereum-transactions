import { SetStateAction, useState } from 'react';
import styles from '../../styles/Home.module.css'
import { DictionaryAll, DictionaryIN, DictionaryOUT} from "../../models/type"
import { ethers } from 'ethers';
import Web3 from 'web3';

interface TokenBalance {
  name: string;
  symbol: string;
  balance: string;
}

const INFURA_KEY = process.env.INFURA_KEY
const IndexPage = () => {
  var Infura_Key = "83c866bc419f4a8ab92a9b464ab9a5d9";
  // State variables and their setter functions using the useState hook
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [option, setOption] = useState<'IN' | 'OUT' | 'ALL'>('IN'); // Définir la valeur par défaut sur "IN"
  const [outputList, setOutputList] = useState<DictionaryIN[] | DictionaryOUT[] | DictionaryAll[]>([]);
  const [date, setDate] = useState('');
  const [ethBalance, setEthBalance] = useState('');
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);

   // Event handler for the Ethereum address input field change
   const handleAddressChange = (event: { target: { value: string }; }) => {
    setAddress(event.target.value);
  };

  // Event handler for the block number input field change
  const handleNumberChange = (event: { target: { value: string }; }) => {
    setNumber(event.target.value);
  };

  // Event handler for the dropdown option change
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(event.target.value as 'IN' | 'OUT' | 'ALL');
  };

  // Function to handle form submission for address history data fetch
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      // Call the API route with user input (address, number, and option)
      const response = await fetch('/api/runPythonScript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address, number, option }), // Include the selected option in the request body
      });
      const data = await response.json();

      // Parsing the response data based on the selected option
      var dictionaryList: any;
      if (option === "IN") {
        const validJsonString = data.data.replace(/\'/g, '"');
        console.log('validJsonString:', validJsonString);
        dictionaryList = JSON.parse(String(validJsonString)) as Array<{
          Transaction: string;
          From: string;
          Sender: string;
          ETH: string;
          EUR: string;
          Fees_EUR: string;
          Fees_ETH: string;
          Time: string;
        }>;
      }
      if (option === "OUT") {
        const validJsonString = data.data.replace(/\'/g, '"');
        dictionaryList = JSON.parse(String(validJsonString)) as Array<{
          Transaction: string;
          From: string;
          To: string;
          ETH: string;
          EUR: string;
          Fees_EUR: string;
          Fees_ETH: string;
          Time: string;
        }>;
      } else {
        const validJsonString = data.data.replace(/\'/g, '"');
        dictionaryList = JSON.parse(String(validJsonString)) as Array<{
          Transaction: string;
          From: string;
          To: string;
          ETH: string;
          EUR: string;
          Fees_EUR: string;
          Fees_ETH: string;
          Time: string;
        }>;
      }

      setOutputList(dictionaryList);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  // Function to handle form submission for address balance at a given date
  const handleSubmit2 = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      // Create a web3 instance using the Infura provider
      const infuraUrl = `https://mainnet.infura.io/v3/${Infura_Key}`;
      const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
      const provider = new ethers.JsonRpcProvider(infuraUrl);

      const timestamp = Date.parse(date) / 1000;

      // Binary search for the block number closest to the specified timestamp
      // (This is done to get the most accurate block for the given date)
      let minBlockNumber = 0;
      let maxBlockNumber = await provider.getBlockNumber();
      let closestBlockNumber = Math.floor((maxBlockNumber + minBlockNumber) / 2);
      let closestBlock = await provider.getBlock(closestBlockNumber);
      let foundExactBlock = false;

      while (minBlockNumber <= maxBlockNumber) {
        console.log(`checking blockNumber=${closestBlockNumber}...`);
        if (closestBlock?.timestamp === timestamp) {
          foundExactBlock = true;
          break;
        } else if (Number(closestBlock?.timestamp) > timestamp) {
          maxBlockNumber = closestBlockNumber - 1;
        } else {
          minBlockNumber = closestBlockNumber + 1;
        }

        closestBlockNumber = Math.floor((maxBlockNumber + minBlockNumber) / 2);
        closestBlock = await provider.getBlock(closestBlockNumber);
      }
 
      // Get the ETH balance at the specified timestamp
      const ethBalance = await web3.eth.getBalance(address, closestBlockNumber);
      const ethBalanceInEth = web3.utils.fromWei(ethBalance, 'ether');
      setEthBalance(ethBalanceInEth);

      // Prepare data for API request to get token balances
      const data = {
        Address: address,
        BlockNumber: closestBlockNumber,
      };

      // Call the API route to get token balances for the provided address and date
      fetch('/api/hello', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => { console.log("la data", data); setTokenBalances(data.tokenBalances) })
      .catch(error => console.error(error));
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
    <div className={styles.container}>
    <div>
        <p className={styles.className_44d352_2}>Address balance at a given date :</p>
        <form onSubmit={handleSubmit2}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Ethereum address"
          className={styles.form_text}
        />
        <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Enter date (YYYY-MM-DD)"
            className={styles.form_text}
        />
        <button type="submit" className={styles.btn}>Submit</button>
        </form>
        <div>
        {ethBalance !== '' && (
            <p className={styles.className_44d352_2}>The balance of the address you gave is : {ethBalance} ETH on {date}.</p>
        )}
        <br></br>


        {tokenBalances.length > 0 ? (
          <>
          <div className={styles.result_container}>
            <p>Token Balances for Address:</p>
            <div className={styles.table_container}>
            <table className={styles.result_table}>
            <thead>
              <tr>
                <th>Token Name :</th>
                <th>Symbol</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {tokenBalances.map((token, index) => (
                <tr key={index}>
                  <td>{token.name}</td>
                  <td>{token.symbol}</td>
                  <td>{token.balance}</td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
          </>
        ) : (
          <p>No token balances found for the given date. You have to submit first.</p>
        )}
        <br></br>
        </div>
    </div>
    <br></br>
      <p className={styles.className_44d352_2}> OR : </p>
    <br></br>
    <p className={styles.className_44d352_2}>Address's History :</p>
      <input
        type="text"
        value={address}
        onChange={handleAddressChange}
        placeholder="Enter Ethereum address"
        className={styles.form_text}
      />

      <input
        type="text"
        value={number}
        onChange={handleNumberChange}
        placeholder="Enter the Block number"
        className={styles.form_text}
      />
      <select value={option} onChange={handleOptionChange}  className={styles.form_text}>
        <option value="IN">IN</option>
        <option value="OUT">OUT</option>
        <option value="ALL">ALL</option>
      </select>
      <button onClick={handleSubmit} className={styles.btn}>Submit</button>
 
    <p>
      Note : If sometimes the value for "EUR" or "Fees in EUR" equal 0 is 
      because I use the coingecko api to fetch the price
      but I use the free api so I have a limited number of request !
    </p>
    <br></br>
    <div className={styles.result_container}>
      <h2>Result :</h2>
    <div className={styles.table_container}>
    <table className={styles.result_table}>
    <thead>
      <tr>
        <th>Transaction Number</th>
        <th>Transaction</th>
        {outputList.some(item => 'From' in item && 'To' in item) && <th>From</th>}
        {outputList.some(item => 'To' in item) && <th>To</th>}
        {outputList.some(item => 'Sender' in item) && <th>Sender</th>}
        <th>ETH</th>
        <th>EUR</th>
        <th>Fees in EUR</th>
        <th>Fees in ETH</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>
      {outputList.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.Transaction}</td>
          {('From' in item && 'To' in item) && <td>{item.From}</td>}
          {('To' in item) && <td>{item.To}</td>}
          {!('To' in item) && <td>{item.Sender}</td>}
          <td>{item.ETH}</td>
          <td>{item.EUR}</td>
          <td>{item.Fees_EUR}</td>
          <td>{item.Fees_ETH}</td>
          <td>{item.Time}</td>
        </tr>
      ))}
    </tbody>
  </table>
    </div>
    </div>
  </div>

   
    </>
  );
};

export default IndexPage;