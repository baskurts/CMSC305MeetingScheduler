import { openDatabase } from "react-native-sqlite-storage";


const mySchedulerDB = openDatabase({name: 'MyScheduler.db'});
const hostsTableName = 'hosts';

module.exports = {
    
    createContactsTable: async function () {
        
        (await mySchedulerDB).transaction(txn => {
            
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${hostsTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    fullname TEXT,
                    email TEXT
                );`,
                
                [],
                
                () => {
                    console.log('Hosts table created successfully');
                },
                error => {
                    console.log('Error creating hosts table ' + error.message);
                },
            );
        });
    },

    
    addHosts: async function (fullname, email) {
        
        (await mySchedulerDB).transaction(txn => {
            
            txn.executeSql(
                `INSERT INTO ${hostsTableName} (fullname, email) VALUES ("${fullname}", "${email}")`,
                
                [],
                
                () => {
                    console.log(fullname + " added successfully");
                },
                error => {
                    console.log('Error adding contact ' + error.message);
                },
            );
        });
    },
};