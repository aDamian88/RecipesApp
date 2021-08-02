import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import Header from './Header';
import {TextInput, Button, Card} from 'react-native-paper';
import {WebView} from 'react-native-webview';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  containerBottom: {
    marginBottom: 500,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
  },
  card: {
    padding: 10,
  },
  video: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 700,
  },
  badgeRight: {
    alignSelf: 'flex-end',
    padding: 12,
    marginLeft: 2,
    borderRadius: 20,
    backgroundColor: '#f2debd',
    color: '#ffff',
  },
  badgeLeft: {
    alignSelf: 'flex-start',
    padding: 12,
    marginLeft: 5,
    borderRadius: 20,
    backgroundColor: '#f2debd',
    color: '#ffff',
  },
});

export default Search = () => {
  const [modalOpen, setModelOpen] = useState(false);

  const [recipe, setRecipe] = useState('');
  const [recipes, setRecipes] = useState([]);

  const [mealIcon, setMealIcon] = useState('');
  const [mealName, setMealName] = useState('');
  const [mealCategory, setMealCategory] = useState('');
  const [mealArea, setMealArea] = useState('');
  const [mealDescription, setMealDescription] = useState('');
  const [mealVideo, setMealVideo] = useState('');
  const [ingredients, setIngedients] = useState([]);

  const fetchRecipes = (text) => {
    setRecipe(text);
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + text)
      .then((response) => response.json())
      .then((responseJson) => {
        setRecipes(responseJson.meals);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getRecipeData = (item) => {
    setMealIcon(item.strMealThumb);
    setMealName(item.strMeal);
    setMealCategory(item.strCategory);
    setMealArea(item.strArea);
    setMealDescription(item.strInstructions);
    setMealVideo(item.strYoutube);

    buildIngredientList(item);

    setModelOpen(true);
  };

  buildIngredientList = (item) => {
    let localList = [];

    for (let i = 1; i <= 20; i++) {
      if (
        item['strMeasure' + i] != null &&
        item['strMeasure' + i].trim() != ''
      ) {
        let ingOne = item['strIngredient' + i] + ' - ' + item['strMeasure' + i];
        localList.push(ingOne);
      }
    }

    setIngedients(localList);
  };

  return (
    <View
      theme={{
        colors: {
          primary: '#f2debd',
        },
      }}>
      <Header name="Search Recipe" />
      <View>
        <TextInput
          label="Food"
          theme={{colors: {primary: '#f2debd'}}}
          value={recipe}
          onChangeText={(text) => fetchRecipes(text)}
        />
      </View>

      <Modal visible={modalOpen}>
        <View style={{flexDirection: 'column', backgroundColor: '#f2debd'}}>
          <Button onPress={() => setModelOpen(false)}>
            <Text style={{color: '#000000'}}>Go Back</Text>
          </Button>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <Image
              source={{
                uri: mealIcon,
              }}
              style={{height: 300, resizeMode: 'stretch', margin: 5}}
            />
          </View>
          <View>
            <Text style={styles.title}>{mealName}</Text>

            <View style={[{flexDirection: 'row'}]}>
              <View style={styles.badgeRight}>
                <Text>{mealCategory}</Text>
              </View>
              <View style={styles.badgeLeft}>
                <Text>{mealArea}</Text>
              </View>
            </View>

            <Card style={styles.card}>
              <Text style={styles.title}>Ingredients </Text>
              <FlatList
                keyExtractor={(item) => item}
                data={ingredients}
                renderItem={({item}) => {
                  return <Text>{item}</Text>;
                }}
              />
            </Card>
            <Card style={styles.card}>
              <Text style={styles.title}>Description</Text>
              <Text>{mealDescription}</Text>
            </Card>

            <Card style={styles.card}>
              <Text style={styles.title}>Video</Text>
              <WebView source={{uri: mealVideo}} style={styles.video} />
            </Card>
          </View>
        </ScrollView>
      </Modal>

      <FlatList
        contentContainerStyle={{paddingBottom: 1500}}
        keyExtractor={(item) => item.idMeal}
        data={recipes}
        renderItem={({item}) => {
          return (
            <Card
              style={{height: 450, margin: 2, padding: 12}}
              onPress={this.getRecipeData.bind(this, item)}>
              <View style={styles.container}>
                <Image
                  source={{
                    uri: item.strMealThumb,
                  }}
                  style={{height: 300, resizeMode: 'stretch', margin: 5}}
                />
              </View>
              <Text style={styles.title}>{item.strMeal}</Text>
            </Card>
          );
        }}
      />
    </View>
  );
};
