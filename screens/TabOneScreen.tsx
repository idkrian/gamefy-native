import { StyleSheet } from 'react-native';

import { Text, View, Image, ScrollView, Pressable } from 'react-native';
import { RootTabScreenProps } from '../types';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [gameData, setGameData] = useState(null)

  useEffect(() => {
    axios.get('https://api.rawg.io/api/games', {
      params: {
        key: 'c9e0822a14d7419995ab6b17a4ff083f',
      }
    }).then(res => setGameData(res.data.results))
  }, [])

  const onPress = (data: any) => () => {
    navigation.navigate('GameDetails', {
      id: data
    })
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text></Text>
        <View>
          {gameData?.map((data: any) => (
            <Pressable key={data.id} onPress={onPress(data.id)}>
              <Text style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
                {data?.name}
              </Text>
              <Image
                style={{
                  width: 300,
                  height: 500,
                }}
                source={{
                  uri: data.background_image
                }}
              />
            </Pressable>

          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
