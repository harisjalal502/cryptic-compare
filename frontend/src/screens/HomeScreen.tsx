import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons'; // For modern icons
import TickerBar from './Tickerbar'; // Import the TickerBar component

const HomeScreen = () => {
  const [exchange, setExchange] = useState('binance');
  const [cryptoA, setCryptoA] = useState('BTC');
  const [cryptoB, setCryptoB] = useState('USDT');
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  const animatedValue = new Animated.Value(0);

  const fetchConversionRate = async (exchange, cryptoA, cryptoB) => {
    // Simulating API response with a random multiplier
    return Math.random() * 100000; // Mocked conversion rate
  };

  useEffect(() => {
    const calculateAmount = async () => {
      if (amountA && !isNaN(amountA)) {
        const conversionRate = await fetchConversionRate(exchange, cryptoA, cryptoB);
        setAmountB((parseFloat(amountA) * conversionRate).toFixed(2));
      } else {
        setAmountB('');
      }
    };

    calculateAmount();
  }, [amountA, exchange, cryptoA, cryptoB]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#6C63FF', '#FF6584'],
  });

  const renderDropdown = (items, value, onChange) => (
    <Picker
      selectedValue={value}
      onValueChange={(itemValue) => onChange(itemValue)}
      style={styles.dropdown}
    >
      {items.map((option) => (
        <Picker.Item key={option.value} label={option.label} value={option.value} />
      ))}
    </Picker>
  );

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <Ionicons name="rocket-outline" size={100} color="white" />
          <Text style={styles.heroTitle}>Crypto Optimizer</Text>
          <Text style={styles.heroSubtitle}>
            Simplify your crypto trading. Fast. Accurate. Modern.
          </Text>
        </View>

        {/* Main Row */}
        <View style={styles.row}>
          {/* Exchange Panel */}
          <View style={styles.panel}>
            <Text style={styles.panelHeader}>Select Exchange</Text>
            {renderDropdown(
              [
                { value: 'binance', label: 'Binance' },
                { value: 'coinbase', label: 'Coinbase' },
                { value: 'kraken', label: 'Kraken' },
              ],
              exchange,
              setExchange
            )}
            <Ionicons name="business-outline" size={32} color="#6C63FF" />
            <Text style={styles.value}>
              {exchange.charAt(0).toUpperCase() + exchange.slice(1)}
            </Text>
          </View>

          {/* Crypto A Panel */}
          <View style={styles.panel}>
            <Text style={styles.panelHeader}>Currency 1</Text>
            {renderDropdown(
              [
                { value: 'BTC', label: 'Bitcoin (BTC)' },
                { value: 'ETH', label: 'Ethereum (ETH)' },
                { value: 'ADA', label: 'Cardano (ADA)' },
              ],
              cryptoA,
              setCryptoA
            )}
            <TextInput
              style={styles.input}
              placeholder="Enter Amount (e.g., 1.5)"
              value={amountA}
              keyboardType="numeric"
              onChangeText={(text) => setAmountA(text)}
            />
            <Ionicons name="cash-outline" size={32} color="#6C63FF" />
          </View>

          {/* Crypto B Panel */}
          <View style={styles.panel}>
            <Text style={styles.panelHeader}>Currency 2</Text>
            {renderDropdown(
              [
                { value: 'USDT', label: 'Tether (USDT)' },
                { value: 'USD', label: 'US Dollar (USD)' },
                { value: 'EUR', label: 'Euro (EUR)' },
              ],
              cryptoB,
              setCryptoB
            )}
            <Text style={styles.value}>{amountB || '---'}</Text>
            <Ionicons name="logo-bitcoin" size={32} color="#6C63FF" />
          </View>
        </View>

        {/* Call-to-Action Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Ready to elevate your trades? 🚀</Text>
          <Text style={styles.bannerSubText}>Sign up now and get free trading insights!</Text>
        </View>
      </ScrollView>

      {/* TickerBar Positioned Above Footer */}
      <View style={styles.tickerBarContainer}>
        <TickerBar />
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Crypto Optimizer | All Rights Reserved</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C63FF',
  },
  content: {
    padding: 16,
  },
  hero: {
    alignItems: 'center',
    marginVertical: 20,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    fontWeight: '300',
    color: '#FFFFFF',
    marginTop: 5,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  panel: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    marginHorizontal: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  panelHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3D3D3D',
    marginBottom: 10,
  },
  dropdown: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 8,
    textAlign: 'center',
    marginTop: 10,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginTop: 10,
  },
  banner: {
    backgroundColor: '#FF6584',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  bannerSubText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 5,
  },
  tickerBarContainer: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 10,
  },
  footer: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#3D3D3D',
  },
  footerText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
});

export default HomeScreen;
