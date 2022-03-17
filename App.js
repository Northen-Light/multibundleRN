import * as React from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import importLazy from "./importLazyPolyfill";


export default function App() {
  const [Home, setHomeMod] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const loadOnDemand = () => {
    setLoading(true);
    importLazy("pages/home/index.js").then(module => {
      setHomeMod(() => module.default);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  }
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'}/>
        <Text>Loading chunk</Text>
      </View>
    );
  }
  if (Home == null) {
    return (
      <View style={styles.container}>
        <Button title={"Fetch bundle"} onPress={loadOnDemand} color="#841584"/>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Home/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
