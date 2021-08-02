import React, {useState} from 'react';
import {View, Text, StatusBar, Button} from 'react-native';
import Search from './screens/Search';
import {createStackNavigator} from '@react-navigation/stack';

function HomeScreen({navigation}) {
  return (
    <View>
      <Button
        onPress={() => navigation.navigate('./screens/Search')} // onPress={onPressLearnMore}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Text>Home Screen</Text>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <View
        theme={{
          colors: {
            primary: '#f2debd',
          },
        }}>
        <Search />
      </View>
    </>
  );
};

export default App;
