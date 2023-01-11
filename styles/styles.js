import { StyleSheet } from 'react-native';

/*valitut värit
*tekstit : 
*tausta: #c9f1fd
*tehoste: #023020
*/

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#c9f1fd',
    borderRadius: 3,
  },

  header: {
    flexDirection: 'row',
    backgroundColor: '#FFC300',
  },

  logo: {
    margin: 50,
    flex: 1,
    aspectRatio: 3.5,
    resizeMode: 'contain'
  },
  team: {
    fontSize: 15,
    fontFamily: 'Robotobold'
  },
  title: {
    fontSize: 27,
    color: 'white',
    fontFamily: 'Orbitronbold',
  },

  title2: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Orbitronbold',
  },
  text: {
    color: 'white',
    padding: 20,
    fontFamily: 'Roboto',
    paddingBottom: 20,
    fontSize: 20,
  },



});