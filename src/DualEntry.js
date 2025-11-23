import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Surface } from 'react-native-paper';
import EntryRow from './EntryRow';

class DualEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [this.emptyRow()],
      error: null,
    };
  }

  emptyRow() {
    return { id: Date.now() + Math.random(), description: '', debit: '', credit: '' };
  }

  addRow = () => {
    this.setState((s) => ({ rows: [...s.rows, this.emptyRow()] }));
  }

  removeRow = (index) => {
    this.setState((s) => {
      const rows = s.rows.slice();
      rows.splice(index, 1);
      return { rows: rows.length ? rows : [this.emptyRow()], error: null };
    });
  }

  onChange = (id, field, value) => {
    this.setState((s) => ({
      rows: s.rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
      error: null,
    }));
  }

  total = () => {
    const { rows } = this.state;
    const sum = (field) =>
      rows.reduce((acc, r) => acc + (parseFloat(r[field]) || 0), 0);
    return { debit: sum('debit'), credit: sum('credit') };
  }

  validate = () => {
    const { debit, credit } = this.total();
    if (debit !== credit) {
      return `Debits (${debit}) must equal Credits (${credit})`;
    }
    return null;
  }

  onSubmit = () => {
    const err = this.validate();
    if (err) {
      this.setState({ error: err });
      return;
    }
    const { rows } = this.state;
    const clean = rows.map((r) => ({ description: r.description, debit: parseFloat(r.debit) || 0, credit: parseFloat(r.credit) || 0 }));
    this.props.onSubmit && this.props.onSubmit(clean);
    this.setState({ rows: [this.emptyRow()], error: null });
  }

  render() {
    const { rows, error } = this.state;
    const totals = this.total();

    return (
      <Surface style={styles.container}>
        <ScrollView>
          {rows.map((r, idx) => (
            <EntryRow
              key={r.id}
              id={r.id}
              description={r.description}
              debit={r.debit}
              credit={r.credit}
              onChange={(id, field, value) => this.onChange(id, field, value)}
              onRemove={() => this.removeRow(idx)}
            />
          ))}
        </ScrollView>

        <View style={styles.controls}>
          <Button mode="contained" onPress={this.addRow} style={styles.btn}>
            Add Row
          </Button>
          <Button mode="contained" onPress={this.onSubmit} style={styles.btn}>
            Submit
          </Button>
        </View>

        <View style={styles.totals}>
          <Text>Debit: {totals.debit}</Text>
          <Text>Credit: {totals.credit}</Text>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </Surface>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  controls: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  btn: { flex: 1, marginHorizontal: 6 },
  totals: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  error: { color: 'red', marginTop: 8 },
});

export default DualEntry;
