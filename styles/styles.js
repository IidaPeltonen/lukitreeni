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
    margin: 10
  },
  text: {
    color: 'black',
    padding: 20,
    fontFamily: 'Calibri',
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
  //nimenantoenttä etusivulla
  textName: {
    fontSize: 30,
    fontFamily: 'calibri-bold',
    marginLeft: 20
  },
  title: {
    fontSize: 27,
    color: 'white',
    fontFamily: 'Calibri',
  },

  title2: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Calibri',
  },
});