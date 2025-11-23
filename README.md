# react-native-dual-entry

Class-based React Native components for a dual-entry accounting system built with react-native-paper.

Quick usage:

1. Install peer dependencies:

   npm install react react-native react-native-paper

2. Install the library (local path during development):

   npm install /path/to/react-native-dual-entry

3. Example (class component usage):

```js
import React, { Component } from 'react';
import { View } from 'react-native';
import DualEntry from 'react-native-dual-entry';

class LedgerScreen extends Component {
  handleSubmit = (entries) => {
    console.log('submitted entries', entries);
  }

  render() {
    return (
      <View style={{flex:1}}>
        <DualEntry onSubmit={this.handleSubmit} />
      </View>
    );
  }
}

export default LedgerScreen;
```

API:
- DualEntry props:
  - onSubmit(entries) => called when entries are valid and user submits
