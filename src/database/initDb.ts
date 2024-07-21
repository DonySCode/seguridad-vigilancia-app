import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'incidents.db',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS incidents (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, photo TEXT, audio TEXT)',
    );
  });
};
