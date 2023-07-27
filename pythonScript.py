import requests
from dateutil import parser
from datetime import datetime
import sys

# Your API key to access the Etherscan API
api_key = "UAMFNKVEE8HGMRICWBK5QWRZ92HWK25224"
# Starting block to fetch transaction history
startblock = 17524427
# Ethereum address for which you want to trace the transaction history
address = "0xe79a02ad6676c39456e6c48ca121a5f8eb61c2b6"
# ETH to EUR conversion rate
eth_eur_rate = 0
# List to store all retrieved transactions
transactionsALL = []

def get_transaction_history(address=sys.argv[1], startblock=sys.argv[2], sens=sys.argv[3]):
    # Constructing the URL for the Etherscan API to fetch transaction history
    url = f"https://api.etherscan.io/api?module=account&action=txlist&address={address}&startblock={startblock}&endblock=99999999&sort=asc&apikey={api_key}"
    response = requests.get(url)
    data = response.json()
    timestampTMP = 0
    value_eur = 0
    fees_eur = 0
    tour = 0

    addressdict = ""
    addressdictvalue = ""

    global eth_eur_rate
    if data["status"] == '1':
        transactions = data['result']
        for tx in transactions:
            hash = tx['hash']
            from_address = tx['from']
            to_address = tx['to']
            value = float(tx['value']) / 10**18
            timestamp = int(tx["timeStamp"])
            date = datetime.fromtimestamp(timestamp)
            format_date = date.strftime("%d-%m-%Y")
            fees = (float(tx['gasPrice']) * float(tx['gasUsed'])) / 10**18
            t = datetime.fromtimestamp(timestamp)

            # Checking the direction of the transaction based on 'sens' parameter
            if sens == "IN":
                if from_address.lower() != address.lower():
                    # Fetching ETH to EUR conversion rate from Coingecko API
                    if timestamp >= timestampTMP:
                        coingecko_url = f'https://api.coingecko.com/api/v3/coins/ethereum/history?date={format_date}'
                        coingecko_response = requests.get(coingecko_url)
                        coingecko_data = coingecko_response.json()
                        eth_eur_rate = coingecko_data['market_data']['current_price']['eur']
                        timestampTMP = timestamp + (86400 * 30)

                    value_eur = value * eth_eur_rate
                    fees_eur = fees * eth_eur_rate
                    addressdict = "Sender"
                    addressdictvalue = to_address
                    transactionsALL.append({"Transaction": hash, addressdict: str(addressdictvalue), "ETH": str(value), "EUR": str(value_eur), "Fees_EUR": str(fees_eur), "Fees_ETH": str(fees), "Time": str(date)})

            elif sens == "OUT":
                if from_address.lower() == address.lower():
                    # Fetching ETH to EUR conversion rate from Coingecko API
                    if timestamp >= timestampTMP:
                        coingecko_url = f'https://api.coingecko.com/api/v3/coins/ethereum/history?date={format_date}'
                        coingecko_response = requests.get(coingecko_url)
                        coingecko_data = coingecko_response.json()
                        eth_eur_rate = coingecko_data['market_data']['current_price']['eur']
                        timestampTMP = timestamp + (86400 * 30)

                    value_eur = value * eth_eur_rate
                    fees_eur = fees * eth_eur_rate
                    addressdict = "To"
                    addressdictvalue = to_address
                    transactionsALL.append({"Transaction": hash, addressdict: str(addressdictvalue), "ETH": str(value), "EUR": str(value_eur), "Fees_EUR": str(fees_eur), "Fees_ETH": str(fees), "Time": str(date)})
            else:
                # Fetching ETH to EUR conversion rate from Coingecko API
                if timestamp >= timestampTMP:
                    coingecko_url = f'https://api.coingecko.com/api/v3/coins/ethereum/history?date={format_date}'
                    coingecko_response = requests.get(coingecko_url)
                    coingecko_data = coingecko_response.json()
                    eth_eur_rate = coingecko_data['market_data']['current_price']['eur']
                    timestampTMP = timestamp + (86400 * 30)

                value_eur = value * eth_eur_rate
                fees_eur = fees * eth_eur_rate
                transactionsALL.append({"Transaction": hash, "From": str(from_address), "To": str(to_address), "ETH": str(value), "EUR": str(value_eur), "Fees_EUR": str(fees_eur), "Fees_ETH": str(fees), "Time": str(date)})
            tour += 1

    else:
        return "System Error"
    return transactionsALL

if __name__ == "__main__":
    # Calling the function with command-line arguments and printing the result
    print(get_transaction_history(sys.argv[1], sys.argv[2], sys.argv[3]))
