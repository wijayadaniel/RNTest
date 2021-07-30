import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './pages/Login';
import JobList from './pages/JobList';
import JobDetail from './pages/JobList/Details';

const RootNavigator = ({}) => {
  const RootStack = createStackNavigator();
  return (
    <RootStack.Navigator initialRouteName="Login">
      <RootStack.Screen
        name="Login"
        options={{headerShown: false}}
        component={Login}
      />
      <RootStack.Screen
        name="JobList"
        options={{headerShown: true, title: 'Job List', headerLeft: null}}
        component={JobList}
      />
      <RootStack.Screen
        name="JobDetail"
        options={{headerShown: true, headerTitle: 'Job Detail'}}
        component={JobDetail}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
