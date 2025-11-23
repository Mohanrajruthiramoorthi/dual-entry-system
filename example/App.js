import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import DualEntry from '../src/DualEntry';

class ExampleApp extends Component {
  handleSubmit = (entries) => {
    // Simple demonstration: alert the json string
    Alert.alert('Submitted entries', JSON.stringify(entries, null, 2));
  }

  render() {
    return (
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <DualEntry onSubmit={this.handleSubmit} />
        </SafeAreaView>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

export default ExampleApp;
