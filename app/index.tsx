import { useEffect, useState } from 'react';
import { FlatList, Text, View, Image, StyleSheet } from 'react-native';
import axios from 'axios';

type Pokemon = {
  name: string,
  url: string,
  image: any
}

export default function Index() {
  // Fetch the data when the app loads
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    // Fetch pokemons
    fetchPokemons()
    console.log("Poekmon -> ", pokemons)
  }, []);

  const fetchPokemons = async () => {
    try {
      let result = await axios('https://pokeapi.co/api/v2/pokemon/?limit=20')
      let pokemonsData = result.data.results
      let pokemonsList: Pokemon[] = []

      // console.log("Poekmon data ", pokemonsData)
           
      if (pokemonsData.length > 0) {
        pokemonsData.forEach(async (pokemon: Pokemon) => {
          let pokemonImage = await axios(pokemon.url)
          pokemonImage = pokemonImage.data.sprites.front_default
          const newPokemon: Pokemon = {
            name: pokemon.name,
            url: pokemon.url,
            image: pokemonImage
          }
          // console.log("*********************************************")
          // console.log("New poke", newPokemon)
          pokemonsList.push(newPokemon)
        })
      }
      
      console.log("Poekmon list fron state ", pokemons)  
      setPokemons(pokemonsList)
    } catch (error) { 
      console.log("Error fetching pokemons", error)
    }
  } 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon List</Text>
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.pokemonCard}>
            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={styles.pokemonImage}
              />
            )}
            <Text style={styles.pokemonName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  pokemonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  pokemonImage: {
    width: 100,
    height: 100,
    marginRight: 12,
  },
  pokemonName: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
});
