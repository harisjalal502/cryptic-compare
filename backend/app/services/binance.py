import ccxt

def fetch_binance_data(symbol):
    try:
        binance = ccxt.binance()
        ticker = binance.fetch_ticker(symbol)
        return {
            'exchange': 'Binance',
            'symbol': ticker['symbol'],
            'price': ticker['last'],
            'fee': binance.fees['trading']['maker'],
        }
    except Exception as e:
        raise RuntimeError(f"Error fetching Binance data: {str(e)}")
