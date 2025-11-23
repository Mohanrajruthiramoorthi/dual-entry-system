import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';

class EntryRow extends React.Component {
  onChange = (field, value) => {
    const { onChange, id } = this.props;
    let parsed = value;
    if (field === 'debit' || field === 'credit') {
      // allow empty or numeric values
      parsed = value === '' ? '' : value.replace(/[^0-9.]/g, '');
    }
    onChange && onChange(id, field, parsed);
  }

  render() {
    const { description = '', debit = '', credit = '', onRemove } = this.props;

    return (
      <View style={styles.row}>
        <TextInput
          label="Description"
          style={styles.flex2}
          value={description}
          onChangeText={(t) => this.onChange('description', t)}
        />
        <TextInput
          label="Debit"
          style={styles.flex1}
          keyboardType="numeric"
          value={debit === null ? '' : String(debit)}
          onChangeText={(t) => this.onChange('debit', t)}
        />
        <TextInput
          label="Credit"
          style={styles.flex1}
          keyboardType="numeric"
          value={credit === null ? '' : String(credit)}
          onChangeText={(t) => this.onChange('credit', t)}
        />
        <IconButton icon="delete" onPress={onRemove} accessibilityLabel="Remove row" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  flex2: { flex: 2, marginRight: 8 },
  flex1: { flex: 1, marginRight: 8 },
});

export default EntryRow;
