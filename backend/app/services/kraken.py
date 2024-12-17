import ccxt

def fetch_kraken_data(symbol):
    try:
        kraken = ccxt.kraken()
        ticker = kraken.fetch_ticker(symbol)
        return {
            'exchange': 'Kraken',
            'symbol': ticker['symbol'],
            'price': ticker['last'],
            'fee': 0.0026  # Example fee, Kraken has tiered fees; update as needed
        }
    except Exception as e:
        raise RuntimeError(f"Error fetching Kraken data: {str(e)}")
