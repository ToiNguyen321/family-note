/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

console.log('1234');

console.log('🔥 index.js loaded', appName);

AppRegistry.registerComponent(appName, () => App);
