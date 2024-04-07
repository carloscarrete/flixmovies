import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';
import PersonScreen from '../screens/PersonScreen';
import SearchScreen from '../screens/SearchScreen';
import { DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { HeartIcon, HomeIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image } from 'react-native';
import FavoritesScreen from '../screens/FavoritesScreen';


const StackNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomePage" component={HomeScreen} />
      <Stack.Screen name="Movie" component={MovieScreen} />
      <Stack.Screen name="Person" component={PersonScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  )
}


const Drawer = createDrawerNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      {/*     <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Movie" component={MovieScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Person" component={PersonScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      </Stack.Navigator> */}
      <Drawer.Navigator
        drawerContent={props => {
          return (<SafeAreaView>
            <View
              style={{
                backgroundColor: 'rgb(64,64,64)',
                height: 200,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
              }}
            >
              <View style={{ width: 100, height: 100, overflow: 'hidden', borderRadius: 50 }}>
                <Image
                  source={{ uri: 'https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
                  style={{ width: 110, height: 100, resizeMode: 'cover' }}
                />
              </View>

              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  marginTop: 10
                }}
              >
                Brand Name
              </Text>

              <Text
                style={{
                  color: 'white',
                  fontSize: 14
                }}
              >
                @brandname
              </Text>
            </View>

            <DrawerItemList {...props} />
          </SafeAreaView>)
        }}
        screenOptions={{ headerShown: false, drawerStyle: { backgroundColor: 'rgb(64 64 64);' } }}>
        <Drawer.Screen name="Home" component={StackNav} options={{ drawerLabelStyle: { color: 'white' }, drawerIcon: () => (<HomeIcon color={'white'} strokeWidth={2} />) }} />
        <Drawer.Screen name="Favorites" component={FavoritesScreen} options={{ drawerLabelStyle: { color: 'white' }, drawerIcon: () => (<HeartIcon color={'white'} strokeWidth={2} />) }} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}