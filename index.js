/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {initDB} from './src/database/initDb';

initDB();
AppRegistry.registerComponent(appName, () => App);
