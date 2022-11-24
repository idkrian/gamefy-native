import { StyleSheet, TextInput } from 'react-native';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, View, Image, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function TabTwoScreen() {

  const navigation = useNavigation()
  const [text, setText] = useState('')
  const [gameData, setGameData] = useState(null)

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
    navigation.navigate('GameDetails', {
      id: data
    })
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40, backgroundColor: 'white' }}
        placeholder="Pesquisar"
        onChangeText={e => setText(e)}
        onSubmitEditing={getData}
        returnKeyType='search'
      />

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.container}>
            {gameData?.map((data: any) => (
              <Pressable key={data.id}
                onPress={onPress(data.id)}
              >
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
    </View>
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
