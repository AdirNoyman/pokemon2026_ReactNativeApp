import axios from 'axios';
import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

type Pokemon = {
  type: string;
  name: string;
  url: string;
  image1: any;
  image2: any;
};

const colorByType = {
  fire: 'rgba(255, 107, 53, 0.5)',
  water: 'rgba(74, 144, 226, 0.5)',
  grass: 'rgba(126, 211, 33, 0.5)',
  electric: 'rgba(245, 166, 35, 0.5)',
  ice: 'rgba(129, 212, 250, 0.5)',
  fighting: 'rgba(208, 2, 27, 0.5)',
  poison: 'rgba(139, 95, 191, 0.5)',
  ground: 'rgba(212, 167, 106, 0.5)',
  flying: 'rgba(144, 164, 174, 0.5)',
  psychic: 'rgba(255, 105, 180, 0.5)',
  bug: 'rgba(139, 195, 74, 0.5)',
  rock: 'rgba(161, 136, 127, 0.5)',
  ghost: 'rgba(123, 31, 162, 0.5)',
  dragon: 'rgba(123, 31, 162, 0.5)',
  dark: 'rgba(66, 66, 66, 0.5)',
  steel: 'rgba(158, 158, 158, 0.5)',
  normal: 'rgba(189, 189, 189, 0.5)',
};

export default function Index() {
  // Fetch the data when the app loads
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    // Fetch pokemons
    fetchPokemons();
    // console.log("Poekmon -> ", pokemons)
  }, []);

  const fetchPokemons = async () => {
    try {
      let result = await axios('https://pokeapi.co/api/v2/pokemon/?limit=20');
      let pokemonsData = result.data.results;
      let pokemonsList: Pokemon[] = [];

      // console.log("Poekmon data ", pokemonsData)

      if (pokemonsData.length > 0) {
        pokemonsData.forEach(async (pokemon: Pokemon) => {
          let pokemonData = await axios(pokemon.url);
          let pokemonImageFront = pokemonData.data.sprites.front_default;
          let pokemonImageBack = pokemonData.data.sprites.back_default;
          let pokemonType = pokemonData.data.types[0].type.name;
          console.log('Pokemon type ', pokemonType);
          const newPokemon: Pokemon = {
            type: pokemonType,
            name: pokemon.name,
            url: pokemon.url,
            image1: pokemonImageFront,
            image2: pokemonImageBack,
          };
          // console.log("*********************************************")
          // console.log("New poke", newPokemon)
          pokemonsList.push(newPokemon);
        });
      }

      // console.log("Poekmon list fron state ", pokemons)
      setPokemons(pokemonsList);
    } catch (error) {
      console.log('Error fetching pokemons', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokémon List</Text>
      <FlatList        
        data={pokemons}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
           
            }}
          >
            <View
              style={[
                styles.pokemonCard,
                {
                  backgroundColor:
                    colorByType[item.type as keyof typeof colorByType] ||
                    '#f5f5f5',
                },
              ]}
            >
              <View>
                <Text style={styles.pokemonName}>{item.name}</Text>
              <Text style={{fontSize: 16, color: 'grey', fontWeight: 600}}>{item.type}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={{ uri: item.image1 }}
                  style={styles.pokemonImage}
                />
                <Image
                  source={{ uri: item.image2 }}
                  style={styles.pokemonImage}
                />
              </View>
            </View>
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
    backgroundColor: '#ffffff',
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
    justifyContent: 'space-between',
    padding: 12,
    marginBottom: 8,
    borderRadius: 15,
    width: '100%',
  },
  pokemonImage: {
    width: 120,
    height: 120,
    marginRight: 12,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
