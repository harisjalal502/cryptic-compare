import ccxt

def fetch_coinbase_data(symbol):
    try:
        coinbase = ccxt.coinbase()
        ticker = coinbase.fetch_ticker(symbol)
        return {
            'exchange': 'Coinbase',
            'symbol': ticker['symbol'],
            'price': ticker['last'],
            'fee': 0.005,  # Hardcoded trading fee for Coinbase
        }
    except Exception as e:
        raise RuntimeError(f"Error fetching Coinbase data: {str(e)}")
