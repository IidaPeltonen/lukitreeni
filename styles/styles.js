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
    fontFamily: 'Roboto',
    marginLeft: 20,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  textHeader2: {
    fontSize: 25,
    fontFamily: 'Roboto',
    marginLeft: 20,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  //nimen input
  textHeaderInput: {
    height: 70,
    borderBottomWidth: 2,
    width: 200,
    fontSize: 25,
    marginBottom: 50,
    alignItems: 'center'
  },
  start: {
    maxWidth: 200,
    marginLeft: 20,
    backgroundColor: '#023020',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 50
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
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  plain: {
    fontSize: 20,
    fontFamily: 'Roboto',
  },
  wrong: {
    fontSize: 20,
    fontFamily: 'Roboto',
    //miksi tämä ei toimi?
  
    color: 'red',
    padding: 5
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginRight: 50
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
    height: 400,
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
  change: {
    backgroundColor: 'lightblue',
    borderWidth: 1,
    borderColor: '#023020',
    shadowOpacity: 10,
    //maxWidth: 400
  },
  //arvottu sana
  show: {
    fontSize: 60,
    fontFamily: 'Roboto',
    margin: 100,
    fontWeight: 'bold'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  letters: {
    alignSelf: 'center',
    height: 150,
    margin: 12,
    borderWidth: 3,
    paddingLeft:30,
    width: 150,
    fontSize: 80,
    marginBottom: 50,
    justifyContent: 'center',
  },



});