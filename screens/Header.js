import * as React from 'react';
import {Appbar, Title} from 'react-native-paper';
import {View, Text, TabBarIOS} from 'react-native';
export default Header = (props) => {
  return (
    <Appbar.Header
      theme={{
        colors: {
          primary: '#f2debd', //e4af8e
        },
      }}
      style={{flexDirection: 'row', justifyContent: 'center'}}>
      <Title style={{color: 'Black'}}>{props.name}</Title>
    </Appbar.Header>
  );
};
