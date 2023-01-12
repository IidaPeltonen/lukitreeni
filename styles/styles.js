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
  text: {
    color: 'black',
    padding: 20,
    fontFamily: 'Roboto',
    paddingBottom: 20,
    fontSize: 20,
  },
  button: {
    color: '#023020'
  },
  navi: {
    backgroundColor: '#c9f1fd',
    color: 'red'
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#c9f1fd',
  },
  logoHomepage: {
    margin: 30,
    flex: 1,
    aspectRatio: 2,
    resizeMode: 'contain',
    backgroundColor: '#c9f1fd'
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
});