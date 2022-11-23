import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useState, useEffect } from 'react';
import { Image, ScrollView } from 'react-native';
import axios from 'axios';

// export type WeatherType = {
//   name: string,
//   main: any,
//   temp: boolean,
//   weather: any,
//   description: string
// }

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [gameData, setGameeData] = useState(null)

  useEffect(() => {
    axios.get('https://api.rawg.io/api/games', {
      params: {
        key: 'c9e0822a14d7419995ab6b17a4ff083f',
        search: 'The Witcher',
      }
    }).then(res => setGameeData(res.data.results))
  }, [])

  return (
    <ScrollView>
      <View style={styles.container}>
        {gameData?.map((data: any) => (
          <>
            <Text style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
              {data?.name}
            </Text>
            <Image
              style={{
                width: '80%',
                height: 500,
              }}
              source={{
                uri: data.background_image
              }}
            />
          </>

        ))}
        {/* <Text style={styles.title}>{weatherData?.name}</Text>
      <Text style={styles.title}>C° {weatherData?.main.temp}</Text>
      <Text style={styles.title}>{weatherData?.weather[0].description}</Text>
      <Image
        style={{
          width: 100,
          height: 100,
        }}
        source={{
          uri: `http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@4x.png`
        }}
      /> 
      */}
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
