import React, { useState, useEffect } from 'react';
import styles from './styles';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Host from '../../components/Host';


import { openDatabase } from "react-native-sqlite-storage";


const mySchedulerDB = openDatabase({name: 'MyScheduler.db'});
const hostsTableName = 'hosts';

const HostsScreen = props => {

  const navigation = useNavigation();

  const [hosts, setHosts] = useState([]);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      
      let results = [];
      
      mySchedulerDB.transaction(txn => {
        
        txn.executeSql(
          `SELECT * FROM ${hostsTableName}`,
          [],
          
          (_, res) => {
            
            let len = res.rows.length;
            console.log('Number of rows: ' + len);
            

            
            if ( len > 0){
              
              for (let i = 0; i < len; i++){
                
                let item = res.rows.item(i);

                results.push({
                  id: item.id,
                  fullname: item.fullname,
                  email: item.email,
                });
              }
              
              setHosts(results);
            } else {
              
              setHosts([]);
            }
          },
          error => {
            console.log('Error getting lists ' + error.message);
          },
        )
      });
    });
    return listener;
  });

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={hosts}
          renderItem={({item}) => <Host post={item} />}
        />
      </View>
        <View style={styles.bottom}>
            <TouchableOpacity
                style={styles.button}
                onPress={ () => navigation.navigate('Add Host')}>
                <Text style={styles.buttonText}>Add Host</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default HostsScreen;