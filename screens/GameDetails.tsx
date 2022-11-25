import { TabRouter } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
import React from 'react'
import { View, Text, Image } from 'react-native'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native'

export type Gamedata = {
    name: string
    background_image: string
    description_raw: string
    developers: any
    released: string
    platforms: any
}

export default function GameDetails() {
    const [gameData, setGameData] = useState<Gamedata | null>(null)
    const route = useRoute()

    useEffect(() => {
        // @ts-ignore
        axios.get(`https://api.rawg.io/api/games/${route?.params?.id}`, {
            params: {
                key: 'c9e0822a14d7419995ab6b17a4ff083f',
            }
        }).then(res => setGameData(res.data))
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#00FF7F',
                    }}
                >
                    {gameData?.name}
                </Text>
                <Image
                    style={{
                        width: 300,
                        height: 500,
                    }}
                    source={{
                        uri: gameData?.background_image
                    }}
                />
                <View style={styles.descriptionsContainer}>
                    <View style={styles.descriptionsDiv}>
                        <Text style={styles.title}>Description</Text>
                        <Text style={styles.description}>{gameData?.description_raw}</Text>
                    </View>
                    <View style={styles.descriptionsDiv}>
                        <Text style={styles.title}>Developer</Text>
                        <Text style={styles.description}>{gameData?.developers[0].name}</Text>
                    </View>
                    <View style={styles.descriptionsDiv}>
                        <Text style={styles.title}>Released</Text>
                        <Text style={styles.description}>{gameData?.released}</Text>
                    </View>
                    <View style={styles.descriptionsDiv}>
                        <Text style={styles.title}>Platforms</Text>
                        {gameData?.platforms.map((data: any, index: any) => (
                            <Text key={index} style={styles.description}>{data.platform.name}</Text>
                        ))}
                    </View>

                </View>
            </View>
        </ScrollView>

    )
}
const styles = StyleSheet.create({
    descriptionsContainer: {
        width: '90%',
        margin: 2
    },
    descriptionsDiv: {
        margin: 3
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    description: {
        color: 'white'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00FF7F',

    },
});
