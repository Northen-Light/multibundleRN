import React from 'react';
import {Button, View} from "react-native";

const BaseScreen = ({navigation}) => {
  return <View style={styles.container}>
    <Button title={"Chunk module"} onPress={() => navigation.navigate('Home')}/>
  </View>
}

export default BaseScreen;

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
}
