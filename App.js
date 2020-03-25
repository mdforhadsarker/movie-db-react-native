/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableHighlight,
  Modal,
} from 'react-native';

const App = () => {
  const apiurl = 'http://www.omdbapi.com/?i=tt3896198&apikey=4c15d655';
  const [state, setState] = useState({
    s: 'Enter a movie...',
    results: [],
    selected: {},
  });
  const search = () => {
    axios(apiurl + '&s=' + state.s).then(({data}) => {
      let results = data.Search;
      // console.log(results);
      setState(prevState => {
        return {...prevState, results: results};
      });
    });
  };
  const openPopup = id => {
    axios(apiurl + '&id=' + id).then(({data}) => {
      let result = data;
      // console.log(result);
      setState(prevState => {
        return {...prevState, selected: result};
      });
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie DB</Text>
      <TextInput
        style={styles.searchBox}
        onChangeText={text =>
          setState(prevState => {
            return {...prevState, s: text};
          })
        }
        onSubmitEditing={search}
        value={state.s}
      />
      <ScrollView style={styles.results}>
        {state.results.map(result => (
          <TouchableHighlight
            key={result.imdbID}
            onPress={() => openPopup(result.imdbID)}>
            <View style={styles.result}>
              <Image
                source={{uri: result.Poster}}
                style={{width: '100%', height: 300, alignItems: 'center'}}
                resizeMode="contain"
              />

              <Text style={styles.heading}>{result.Title}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={false}
        visible={typeof state.selected.Title !== 'undefined'}>
        <View style={styles.popup}>
          <Text style={styles.popupTitle}>{state.selected.Title}</Text>
          <Text>Year: {state.selected.Year}</Text>
          <Text style={{}}>Genre: {state.selected.Genre}</Text>
          <Text style={{}}>Rating: {state.selected.imdbRating}</Text>
          <Text style={{marginBottom: 20}}>
            Director: {state.selected.Director}
          </Text>
          <Text style={{marginBottom: 20}}>{state.selected.Plot}</Text>
          <TouchableHighlight
            onPress={() =>
              setState(prevState => {
                return {...prevState, selected: {}};
              })
            }>
            <Text style={styles.closeBtn}>Close</Text>
          </TouchableHighlight>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223343',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchBox: {
    fontSize: 20,
    fontWeight: '300',
    padding: 20,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 40,
  },
  results: {
    flex: 1,
  },
  result: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  heading: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    padding: 20,
    backgroundColor: '#445565',
  },
  popup: {
    backgroundColor: '#dedede',
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  popupTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5,
    textAlign: 'center',
  },
  closeBtn: {
    width: '100%',
    color: '#fff',
    padding: 15,
    fontSize: 20,
    fontWeight: '700',
    backgroundColor: '#2484C4',
    borderRadius: 15,
    textAlign: 'center',
  },
});

export default App;
