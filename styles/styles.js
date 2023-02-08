import { StyleSheet } from 'react-native';

/*valitut värit
*tausta: #c9f1fd
*tehoste: #023020
*/

export default StyleSheet.create({

  //aloitus-aivujen container
  frontContainer: {
    backgroundColor: '#c9f1fd',
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%'
  },
  //logon paikka
  header: {
    backgroundColor: '#c9f1fd',
    alignItems: 'center',
    height: '35%'
  },
  //iso logo
  logoHomepage: {
    width: '90%',
    aspectRatio: 2,
    resizeMode: 'contain',
    // marginBottom: 20,
    maxHeight: '100%'
  },
  //ohjetekstien otsikot kaikilla etusivulla
  textHeader: {
    fontSize: 25,
    fontFamily: 'Roboto',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  //pienemmät headerit 
  textHeader2: {
    fontSize: 18,
    fontFamily: 'Roboto',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  //nimen input
  textHeaderInput: {
    borderBottomWidth: 1,
    fontSize: 18,
    alignItems: 'center',
    alignSelf: 'center'
  },
  //aloita-nappi
  start: {
    maxWidth: 300,
    backgroundColor: '#023020',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  //start-napin teksti
  startText: {
    fontSize: 18,
    color: 'white',
    padding: 5,
  },
  //footer
  footer: {
    flexDirection: 'row',
    backgroundColor: '#c9f1fd',
    position: 'absolute',
    alignItems: 'center',
    bottom: 5,
    left: 10,
    right: 0,
  },
  //tasovalinnan contaner
  chooseLvl: {
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  //perus, ohjetekstit
  plain: {
    fontFamily: 'Roboto',
    fontSize: 15,
    alignSelf: 'center'
  },
  //tasovalinnan tekstit
  choice: {
    alignSelf: 'center',
    fontSize: 14,
  },
  //väliviivat tasovalintaan
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: 300,
    fontSize: 0,
    padding: 2
  },
  //arvottu sana
  showWord: {
    fontSize: 70,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  //arvottu lause
  showSen: {
    fontSize: 50,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  //timerin näyttö
  Clock: {
    fontSize: 17,
    alignSelf: 'baseline',
    position: 'absolute',
    bottom: 5,
    left: 400,
    right: 0,
    justifyContent: 'flex-end',
  },
  //tasonvaihto-nappulan tyylit
  change: {
    backgroundColor: 'lightblue',
    borderWidth: 1,
    borderColor: '#023020',
    padding: 2,
    marginTop: 10,
    marginBottom: 10
  },
  //oikeaan ylänurkkaan haluttavat elementit
  right: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginRight: 30,
  },
  //lauseiden tausta
  SentencesTable: {
    backgroundColor: '#c9f1fd',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 150,
    marginRight: 150,
    borderStyle: 'dashed',
    height: '60%'
  },
  //muuttuvien numeroiden näyttö
  NumbersTable: {
    backgroundColor: '#c9f1fd',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    marginBottom: 20,
    marginTop: 60,
    marginLeft: 150,
    marginRight: 150,
    borderStyle: 'dashed',
    height: '60%'
  },
  //muistettavan numerosarjan näyttö
  MemoryTable: {
    backgroundColor: '#c9f1fd',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    padding: 10
  },
  //vierekkäin haluttavat elementit
  nextTo: {
    flexDirection: 'row',
    marginRight: 15,
    marginLeft: 15,
    justifyContent: 'center'
  },
  //työmuisti-sivun tarkista-nappi
  checkNumber: {
    width: 200,
    backgroundColor: '#023020',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 30,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    alignSelf: 'center',
    marginTop: 15
  },
  //työmuisti-sivun tarkista-napin teksti
  checkNumberText: {
    fontSize: 18,
    color: 'white',
  },
  //kirjain-sivun container
  LetterTable: {
    backgroundColor: '#c9f1fd',
    height: '60%',
    marginTop: 30,
  },

  //väärät vastaukset
  wrong: {
    fontSize: 20,
    fontFamily: 'Roboto',
    marginTop: 70,
    color: 'red'
  },
  //väärät vastaukset, kuvakenttä
  wrongPic: {
    fontSize: 20,
    fontFamily: 'Roboto',
    marginTop: 70,
    color: 'red'
  },
  //noppien container
  DiceTable: {
    backgroundColor: '#c9f1fd',
    height: 550,
    marginTop: 30,
    alignItems: 'center'
  },
  //yhden nopan väärä vastaus
  wrongDice: {
    fontSize: 20,
    fontFamily: 'Roboto',
    marginTop: 10,
    color: 'red',
    marginBottom: 0
  },

  //kirjain-sivun tarkista-napin teksti
  checkLetterText: {
    fontSize: 18,
    color: 'white',
  },
    //työmuistin tekstikenttä:
    infoPics: {
      textAlign: 'center'
    },
      //vierekkäin haluttavat nopat ja välimerkit
  nextToDices: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});