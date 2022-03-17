import {useEffect, useState} from "react";
import {ActivityIndicator, Text, View} from "react-native";
import * as React from "react";
import importLazy from "../../importLazyPolyfill";

const HomeScreen = () => {
  const [Home, setHome] = useState(null);
  useEffect(() => {
    importLazy('pages/Home/index.js').then(module => {
      setHome(() => module.default);
    });
  }, []);
  if (Home === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'}/>
        <Text>Loading Home bundle chunk</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Home/>
    </View>
  );
};

export default HomeScreen;

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
};
