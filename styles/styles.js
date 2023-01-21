import { StyleSheet } from 'react-native';

/*valitut värit
*tekstit : 
*tausta: #c9f1fd
*tehoste: #023020
*/

export default StyleSheet.create({

  //ivun 'kehykset
  container: {
    flex: 1,
    backgroundColor: '#c9f1fd',
    margin: 0,
    padding: 0, 
    maxHeight: '100%',
    maxWidth: '100%',
  },
  //logon paikka
  header: {
    backgroundColor: '#c9f1fd',
    alignItems: 'center',
    height: '35%'
  },
  //iso logo
  logoHomepage: {
    width: '100%',
    aspectRatio: 10/2,
    resizeMode: 'contain',
    backgroundColor: '#c9f1fd',
    marginBottom: 20,
    alignSelf: 'center',
    maxHeight: '100%'
  },
  //drawer-navi
  navi: {
    backgroundColor: '#c9f1fd',
    tintColor: 'purple1'
  },
  //nimenantoteksti etusivulla
  textHeader: {
    fontSize: 25,
    fontFamily: 'Roboto',
    marginLeft: 20,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
    //headerit muualla
    textHeader2: {
      fontSize: 20,
      fontFamily: 'Roboto',
      marginLeft: 20,
      alignSelf: 'center',
      fontWeight: 'bold'
    },
  //nimen input
  textHeaderInput: {
    height: 50,
    borderBottomWidth: 2,
    maxWidth: 200,
    fontSize: 20,
    marginBottom: 5,
    alignItems: 'center'
  },
  //keskelle sivua haluttavat elementit
  center: {
    alignContent: 'center',
    alignSelf: 'center'
  },
  //start-button
  start: {
    maxWidth: 200,
    backgroundColor: '#023020',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
  },
  //start-button text
  startText: {
    fontSize: 20,
    color: 'white',
    padding: 10,
  },
  //tasovalinnan view
  chooseLvl: {
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  //tasovalinnan tekstit
  choice: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  //väliviivat tasovalintaan
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
    width: 100,
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
    flexDirection: 'row',
    backgroundColor: '#c9f1fd',
    position: 'absolute',
    alignItems: 'center',
    bottom:0,
    left: 0,
    right: 0,
    paddingBottom: 10,
    marginLeft: 10
  },
  WordsTable: {
    backgroundColor: '#c9f1fd',
    alignItems: 'center',
    borderWidth: 6,
    marginBottom: 50,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
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
  },
  //arvottu sana
  show: {
    fontSize: 60,
    fontFamily: 'Roboto',
    margin: 10,
    fontWeight: 'bold',
    marginBottom: 80,
    marginTop: 80
  },
  letters: {
    alignSelf: 'center',
    height: 120,
    margin: 12,
    borderWidth: 3,
    paddingLeft:30,
    width: 120,
    fontSize: 80,
    marginBottom: 50,
    justifyContent: 'center',
  },



});