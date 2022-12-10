import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {store} from './src/store';
import HomeScreen from './src/screens/Home';
import DetailScreen from './src/screens/Detail';
import ProfileScreen from './src/screens/Profile';

const Drawer = createSharedElementStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{headerShown: false}}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen
          name="Detail"
          component={DetailScreen}
          sharedElements={route => {
            const {index} = route.params;
            return [`item.${index}`];
          }}
        />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
