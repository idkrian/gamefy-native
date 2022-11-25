import { StyleSheet, TextInput } from 'react-native';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, View, Image, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function TabTwoScreen() {

  const navigation = useNavigation()
  const [text, setText] = useState('')
  const [gameData, setGameData] = useState<{ map: any } | null>(null)

  const getData = () => {
    axios.get('https://api.rawg.io/api/games', {
      params: {
        key: 'c9e0822a14d7419995ab6b17a4ff083f',
        search: text,
      }
    })
      .then(res => setGameData(res.data.results))
  }
  const onPress = (data: any) => () => {
    // @ts-ignore
    navigation.navigate('GameDetails', {
      id: data
    })
  };

  return (
    <ScrollView>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <TextInput
          style={{ height: 40, width: 200, backgroundColor: 'white' }}
          placeholder="Pesquisar"
          onChangeText={e => setText(e)}
          onSubmitEditing={getData}
          returnKeyType='search'
        />
      </View>

      <View style={styles.container}>
        {gameData?.map((data: any) => (
          <Pressable style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }} key={data.id} onPress={onPress(data.id)}>
            <Text style={{
              color: '#00FF7F',
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 5
            }}>
              {data?.name}
            </Text>
            <Image
              style={{
                width: 350,
                height: 550,
              }}
              source={{
                uri: data.background_image
              }}
            />
          </Pressable>
        ))}
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
  textInput: {
    backgroundColor: 'white',
    color: 'black'
  },

});
