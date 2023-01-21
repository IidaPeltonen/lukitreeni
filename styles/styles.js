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
    aspectRatio: 10 / 2,
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
  //ohjetekstit tää esim vaihda tasoa-napissa
  plain: {
    fontSize: 20,
    fontFamily: 'Roboto',
  },
  //etusivujen ohjeet
  plainText: {
    fontFamily: 'Roboto',
    fontSize: 18,
    alignSelf: 'center'
  },
  //oikeaan ylänurkkaan haluttavat elementit
  right: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginRight: 30,
  },
  //tasonvaihto-nappulan tyylit
  change: {
    backgroundColor: 'lightblue',
    borderWidth: 1,
    borderColor: '#023020',
    shadowOpacity: 10,
    borderRadius: 10,
    padding: 5
  },
  //tasonvaihto-nappulan teksti
  changeText: {
    fontSize: 15
  },
  //muuttuvien sanojen näyttö
  WordsTable: {
    backgroundColor: '#c9f1fd',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 150,
    marginRight: 150,
    borderStyle: 'dashed'
  },
  //arvottu sana
  showWord: {
    fontSize: 60,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  //timerin näyttö
  Clock: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 17,
    alignSelf: 'baseline',
    position: 'absolute',
    bottom: 5,
    left: 5,
    right: 0
  },
  //lauseiden tausta
  SentencesTable: {
    backgroundColor: '#c9f1fd',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    borderStyle: 'dashed'
  },
  //arvottu lause
  showSen: {
    fontSize: 50,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  //kirjain-sivun kirjainkentät
  nextTo: {
    flexDirection: 'row',
  },
  //kirjain-sivun kentät
  letters: {
    //alignSelf: 'center',
    height: 110,
    width: 110,
    borderWidth: 3,
    margin: 20,
/*  PUHELIMELLA NÄYTTÄÄ TÄYDELLISELTÄ NÄIN
   fontSize: 80,
    marginTop: 40,
    marginBottom: 40,
    justifyContent: 'center', 
    paddingLeft: 30 */
    fontSize: 60,
    marginTop: 40,
    marginBottom: 40,
    justifyContent: 'center', 
    paddingLeft: 20, 
    paddingRight: 20, 
    paddingTop: 0, 
    paddingBottom: 0, 
  },
    //footer
    footer: {
      flexDirection: 'row',
      backgroundColor: '#c9f1fd',
      position: 'absolute',
      alignItems: 'center',
      bottom: 0,
      left: 0,
      right: 0,
      paddingBottom: 10,
      marginLeft: 10
    },
//kirjain-sivun väärä vastaus
  wrong: {
    fontSize: 20,
    fontFamily: 'Roboto',
    marginTop: 70,
    color: 'red'
  },

  end: {
    marginTop: 200
  },









});