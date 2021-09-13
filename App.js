// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import Routes from './src/Routes';

export default function App() {
  return (
      <Provider store={store}>
        <Toast ref={ref =>Toast.setRef(ref)} />
        <Routes />
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
