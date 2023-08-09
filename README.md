# Ethereum Transactions Web App - User Guide

This guide provides instructions on how to set up and use the Ethereum Transactions Web App. The project includes a Next.js web app that allows you to retrieve transaction data from the Ethereum blockchain. You can find the full code and project files in the [GitHub repository](https://github.com/Souhail99/Ethereum-transactions).

## Prerequisites
Before getting started, ensure that you have the following software installed on your machine:

- Node.js (LTS version or higher)
- npm (Node Package Manager)
- Python

## Clone the Repository
To get started, you'll need to clone the GitHub repository to your local machine. Open your terminal and execute the following command:

```bash
git clone https://github.com/Souhail99/Ethereum-transactions.git
```

## Install Dependencies
After cloning the repository, navigate into the project directory using the terminal:

```bash
cd Ethereum-transactions
```
## Clone the Repository
To get started, you'll need to clone the GitHub repository to your local machine. Open your terminal and execute the following command:

```bash
npm install
```
## Start the Web App

With the dependencies installed, you can now start the Ethereum Transactions Web App. In the terminal, run the following command:

```bash
npm run dev
```
The web app should now be up and running at http://localhost:3000.

## Using the Web App

### Address Balance at a Given Date 

To check the Ethereum balance of a specific address on a particular date:
- Enter the Ethereum address in the "Enter Ethereum address" field.
- Enter the date in the format "YYYY-MM-DD" in the "Enter date" field.
- Click the "Submit" button.
- The Ethereum balance of the address on the specified date will be displayed below the input fields.

### Address History

To retrieve the transaction history of a specific address based on a block number and option (IN, OUT, or ALL):
- Enter the Ethereum address in the "Enter Ethereum address" field.
- Enter the block number in the "Enter the Block number" field.
- Select the desired option (IN, OUT, or ALL) from the dropdown menu.
- Click the "Submit" button.
- The transaction history for the address and block number, based on the selected option, will be displayed in a table.

#### Python Script

We use a Python script to fetch additional data. The script is executed on the server-side to interact with the Ethereum blockchain and retrieve detailed transaction history. The Python script is stored in the root directory of the project.


### Token Balances for Address
- To view the token balances of a specific address on a particular date:
- Enter the Ethereum address in the "Enter Ethereum address" field.
- Enter the date in the format "YYYY-MM-DD" in the "Enter date" field.
- Click the "Submit" button.
- The token balances for the given address on the specified date will be displayed in a table.

## Note 

Please note that for the "Token Balances for Address" feature, the web app fetches data from an external API (Chainbase API) using the provided address and block number. Additionally, the API used for fetching token prices might have limitations in the free version, which could result in zero values for "EUR" or "Fees in EUR."

## APIs :

- [Etherscan API Documentation](https://etherscan.io/apis): Used to retrieve transaction data from the Ethereum blockchain.
- [CoinGecko API Documentation](https://www.coingecko.com/api/documentation): Used to fetch token prices for converting ETH to EUR.
- [Chainbase API](https://api.chainbase.online/): Used to retrieve token balances (not the ETH balance but just for the others tokens) for a given address at a specific block number.

You have to provided your private keys for **Infura**, **Etherscan**, and **Chainbase** and to input them at the place of mine.
