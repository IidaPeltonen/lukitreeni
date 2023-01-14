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
    margin: 0
  },
  header: {
    backgroundColor: '#c9f1fd',
    alignItems: 'center',
  },
  logoHomepage: {
    aspectRatio: 2,
    resizeMode: 'contain',
    backgroundColor: '#c9f1fd',
    marginBottom: 100,
    alignSelf: 'center'
  },
  logo: {
    aspectRatio: 2,
    resizeMode: 'contain',
    backgroundColor: '#c9f1fd',
    alignSelf: 'center'
  },
  navi: {
    backgroundColor: '#c9f1fd',
    color: 'red'
  },
  //nimenantotekstietusivulla
  textHeader: {
    fontSize: 30,
    fontFamily: 'Calibri-bold',
    marginLeft: 20,
  },
  //nimen input
  textHeaderInput: {
    height: 70,
    margin: 12,
    borderBottomWidth: 3,
    padding: 10,
    width: 500,
    fontSize: 25,
    marginBottom: 50
  },
  start: {
    maxWidth: 200,
    marginLeft: 20,
    backgroundColor: '#023020',
    alignItems: 'center',
    borderRadius: 5
  },
  startText: {
  fontSize: 20,
   color: 'white',
   padding: 10,
  },
  welcome: {
    alignContent: 'center',
    alignSelf: 'center'
  },
  user: {
    fontSize: 30,
    fontFamily: 'Calibri-bold',
  },
  plain: {
    fontSize: 20,
    fontFamily: 'Calibri',
  },
  end: {
    marginTop: 200
  },
  footer: {
    backgroundColor: '#c9f1fd',
    borderRadius: 3,
    padding: 10,
    position: 'absolute',
    alignItems: 'center',
    bottom:0,
    left: 0,
    right: 0
  },
  //tasovalinnan tekstit
  choise: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  //väliviivat tasovalintaan
  lineBold: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  WordsTable: {
    backgroundColor: '#c9f1fd',
    alignItems: 'center',
    borderWidth: 6,
    marginBottom: 50,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
    height: 450,
    borderStyle: 'dashed'
  },
  Clock: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 17,
    alignSelf: 'baseline',
    marginLeft: 950,
    position: 'absolute',
    bottom:10,
    left: 0,
    right: 5
  },

});