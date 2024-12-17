import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, FlatList } from 'react-native';

const TickerBar = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const scrollAnim = useRef(new Animated.Value(0)).current;

  // Fetch and update prices every minute
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Get the top 10 cryptocurrencies
        const topResponse = await fetch(
          'https://min-api.cryptocompare.com/data/top/totalvol?limit=10&tsym=USD'
        );
        const topData = await topResponse.json();
        const topCoins = topData.Data;

        // Map the coin names
        const top10Symbols = topCoins.map((coin) => coin.CoinInfo.Name).join(',');

        // Get the price data for the top 10 cryptocurrencies
        const priceResponse = await fetch(
          `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${top10Symbols}&tsyms=USD`
        );
        const priceData = await priceResponse.json();

        // Combine coin data with prices
        const updatedData = topCoins.map((coin) => ({
          name: coin.CoinInfo.FullName,
          shortname: coin.CoinInfo.Name,
          icon: `https://www.cryptocompare.com${coin.CoinInfo.ImageUrl}`,
          price: priceData[coin.CoinInfo.Name]?.USD || 'N/A',
        }));

        setCryptoData(updatedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Update every 60 seconds
    return () => clearInterval(interval);
  }, []);

  // Animate the scrolling effect
  useEffect(() => {
    if (cryptoData.length > 0) {
      Animated.loop(
        Animated.timing(scrollAnim, {
          toValue: -3000, // Adjust based on the width of the content
          duration: 60000, // Match the desired scroll speed
          useNativeDriver: true,
        })
      ).start();
    }
  }, [cryptoData]);

  return (
    <View style={styles.cryptoPriceContainer}>
      <Animated.View
        style={[
          styles.coinList,
          {
            transform: [{ translateX: scrollAnim }],
          },
        ]}
      >
        {cryptoData.map((coin, index) => (
          <View key={index} style={styles.coinContainer}>
            <Image source={{ uri: coin.icon }} style={styles.coinImage} />
            <Text style={styles.coinName}>{coin.name}</Text>
            <Text style={styles.coinShortname}>({coin.shortname})</Text>
            <Text style={styles.coinPrice}>${coin.price.toLocaleString()}</Text>
          </View>
        ))}
        {/* Duplicate for seamless scrolling */}
        {cryptoData.map((coin, index) => (
          <View key={`${index}-duplicate`} style={styles.coinContainer}>
            <Image source={{ uri: coin.icon }} style={styles.coinImage} />
            <Text style={styles.coinName}>{coin.name}</Text>
            <Text style={styles.coinShortname}>({coin.shortname})</Text>
            <Text style={styles.coinPrice}>${coin.price.toLocaleString()}</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  cryptoPriceContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#f5f5f7',
    overflow: 'hidden',
  },
  coinList: {
    flexDirection: 'row',
    minWidth: '100%',
    justifyContent: 'flex-start',
  },
  coinContainer: {
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  coinImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 8,
  },
  coinName: {
    marginRight: 8,
    fontWeight: '700',
    color: '#333',
  },
  coinShortname: {
    marginRight: 8,
    fontWeight: '700',
    color: '#555',
  },
  coinPrice: {
    fontWeight: '300',
    color: '#777',
  },
});

export default TickerBar;
