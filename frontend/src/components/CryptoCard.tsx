import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CryptoCard = ({ exchange, symbol, price, fee }: any) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>Exchange: {exchange}</Text>
      <Text style={styles.text}>Symbol: {symbol}</Text>
      <Text style={styles.text}>Price: ${price}</Text>
      <Text style={styles.text}>Fee: {(fee * 100).toFixed(2)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 3,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default CryptoCard;
