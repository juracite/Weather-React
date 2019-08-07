import React from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import store from './store';
import SearchScreen from './screens/search-screen';
import AdvancedDetailScreen from './screens/advanced-detail-screen';
import IndexScreen from './screens';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

const StackNavigator = createStackNavigator(
  {
    Index: IndexScreen,
    Search: SearchScreen,
    Detail: AdvancedDetailScreen
  },
  {
    initialRouteName: 'Index',
    headerMode: 'none'
  }
);

const Routes = createAppContainer(StackNavigator);
