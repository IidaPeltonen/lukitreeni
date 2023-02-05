import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Image, ScrollView } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import WordsTable from "./WordsTable";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

let right = 0
let done = 0

//tarvitaan lista sanoja
const words1 = ['si-su', 'a-su', 'uu-si', 'su-si', 'aa-si', 'sa-tu', 'su-ti', 'au-to', 'sa-to', 'sa-na',
  'uu-ni', 'on-ni', 'la-si', 'mu-na', 'le-lu', 'ma-to', 'o-ma', 'ni-mi', 'lu-mi', 'me-no', 'lato',
  'an-sa', 'e-mo', 'tu-li', 'to-ri', 'pi-po', 'ra-ta', 'po-ni', 'pe-li', 'ra-pu', 'ai-ro', 'lu-pa', 'ro-mu',
  'mu-ru', 'pa-pu', 'ri-pa', 'äi-ti', 'ky-nä', 'ju-na', 'ka-na', 'ha-na', 've-si', 'sa-de', 'kä-si', 'si-ka',
  'ko-ti', 'ka-la', 'ää-ni', 'pe-sä', 'ka-sa', 'nä-mä', 'tä-mä', 'sa-li', 'syli', 'pö-ly', 'ki-vi', 'sa-vi',
  'va-sa', 'kä-py', 'ri-vi', 'ku-va', 'va-lo', 'ma-ja', 'jo-ki', 'va-ja', 'ar-pa', 'ke-sä', 'ma-de', 'or-ja',
  'jo-no', 'vä-ri', 'oh-je']
const words2 = ['sisu', 'asu', 'uusi', 'susi', 'aasi', 'satu', 'suti', 'auto', 'sato', 'sana', 'uuni', 'onni',
  'lasi', 'muna', 'lelu', 'mato', 'oma', 'nimi', 'lumi', 'meno', 'lato', 'ansa', 'emo', 'tuli', 'tori', 'pipo',
  'rata', 'poni', 'peli', 'rapu', 'airo', 'lupa', 'romu', 'muru', 'papu', 'ripa', 'äiti', 'kynä', 'juna', 'kana',
  'hana', 'vesi', 'sade', 'käsi', 'sika', 'koti', 'kala', 'ääni', 'pesä', 'kasa', 'nämä', 'tämä', 'sali', 'syli',
  'pöly', 'kivi', 'savi', 'vasa', 'käpy', 'rivi', 'kuva', 'valo', 'maja', 'joki', 'vaja', 'arpa', 'kesä', 'made',
  'orja', 'jono', 'väri', 'ohje']
const words3 = ['sau-na', 'son-ni', 'nas-ta', 'tas-su', 'suo-ni', 'tun-ti', 'nut-tu', 'tus-si', 'sai-ta',
  'tut-ti', 'tat-ti', 'uin-ti', 'nau-la', 'len-to', 'lau-lu', 'met-so', 'sol-mu', 'muo-ti', 'mai-to', 'suo-la',
  'luo-la', 'lie-mi', 'noi-ta', 'neu-la', 'puo-mi', 'rau-ta', 'sär-ki', 'hel-mi', 'läm-pö', 'köy-si', 'har-ja',
  'jal-ka', 'jäl-ki', 'kir-ja', 'vau-nu', 'lai-va', 'kis-sa', 'koi-ra', 'kou-lu', 'kaa-li', 'suk-ka', 'tal-vi',
  'sil-ta', 'e-ta-na', 'a-pi-na', 'saa-vu-tus', 'ko-li-na', 'he-vo-nen', 'pork-ka-na', 'pe-ru-na',
  'sit-ruu-na', 'nuo-ti-o', 'o-me-na', 'a-si-a', 'en-nus-te', 'a-na-nas', 'neu-la-nen', 'tu-si-na',
  'u-nel-ma', 'a-no-mus', 'lau-ta-nen', 'si-ni-nen', 'o-ra-va', 'pa-lik-ka', 'seit-se-män', 'rä-py-lä',
  'pää-ry-nä', 'kat-ti-la', 'si-nap-pi', 'ru-sak-ko', 'man-sik-ka', 'kir-ju-ri', 'sok-ke-lo', 'tans-si-ja',
  'vaah-te-ra', 'met-sik-kö', 'ka-ta-ja', 'le-pak-ko', 'op-pi-las', 'kou-lu-tus', 'pal-kin-to', 'ret-kei-ly',
  'put-kis-to', 'kur-pit-sa']
const words4 = ['sauna', 'sonni', 'nasta', 'tassu', 'suoni', 'tunti', 'nuttu', 'tussi', 'saita', 'tutti', 'tatti',
  'uinti', 'naula', 'lento', 'laulu', 'metso', 'solmu', 'muoti', 'maito', 'suola', 'luola', 'liemi', 'noita',
  'neula', 'puomi', 'rauta', 'särki', 'helmi', 'lämpö', 'köysi', 'harja', 'jalka', 'jälki', 'kirja', 'vaunu',
  'laiva', 'kissa', 'koira', 'koulu', 'kaali', 'sukka', 'talvi', 'silta', 'etana', 'apina', 'saavutus', 'kolina',
  'hevonen', 'porkkana', 'peruna', 'sitruuna', 'nuotio', 'omena', 'asia', 'ennuste', 'ananas', 'neulanen',
  'tusina', 'unelma', 'anomus', 'lautanen', 'sininen', 'orava', 'palikka', 'seitsemän', 'räpylä', 'päärynä',
  'kattila', 'sinappi', 'rusakko', 'mansikka', 'kirjuri', 'sokkelo', 'tanssija', 'vaahtera', 'metsikkö',
  'kataja', 'lepakko', 'oppilas', 'koulutus', 'palkinto', 'retkeily', 'putkisto', 'kurpitsa']
const words5 = ['tosipitkäsana', 'vieläpidempisana', 'lentokoneturbiini']
const words6 = ['omu', 'letu', 'isal', 'övein', 'uumi', 'ioto', 'aksi', 'äkkö', 'vyyri', 'louki', 'ima',
  'lati', 'ysöl', 'ivoin', 'yyni', 'äitö', 'asto', 'ykke', 'vaare', 'kyöli', 'laijo', 'ratte', 'mörjä',
  'vahke', 'heitus', 'pelvas', 'niirma', 'keissy', 'pirtto', 'kursto', 'imo', 'leta', 'äsel', 'ovein',
  'eeni', 'euta', 'usto', 'ikka', 'vaaro', 'liuke', 'laijo', 'rattu', 'marji', 'vohko', 'heisot', 'vispis',
  'neermi', 'suikke', 'purtto', 'korsti', 'ame', 'leti', 'ösyl', 'ävyin', 'ooni', 'oita', 'esta', 'ikkä',
  'vuuro', 'luoki', 'laiju', 'retta', 'merji', 'vohka', 'houtas', 'vuspis', 'näärmö', 'soukke', 'parttu',
  'kursta', 'ipa', 'rila', 'ipes', 'usoin', 'yymi', 'euno', 'yksö', 'ättö', 'roohe', 'vieta', 'reita',
  'jikku', 'kensa', 'löhti', 'siilos', 'kosvit', 'määntö', 'tuippo', 'tilkke', 'palske', 'upe', 'relu',
  'apis', 'osein', 'öömi', 'yinä', 'iksa', 'ettu', 'rooha', 'tievo', 'roita', 'jikkä', 'kunso', 'lahtu',
  'seelis', 'kesvat', 'miinta', 'täyppö', 'talkku', 'pilska', 'ypä', 'rula', 'opes', 'ysöin', 'eemo', 'oini',
  'akso', 'itta', 'haare', 'vietu', 'ruite', 'jikko', 'kinsa', 'lihta', 'siilus', 'kisvet', 'meenti', 'touppa',
  'tulkko', 'pylske', 'ave', 'jene', 'oret', 'älöin', 'yysö', 'oika', 'atsu', 'oppa', 'miile', 'suove',
  'poini', 'nilla', 'rinsa', 'keemos', 'peltan', 'vyyhty', 'hoittu', 'nirppo', 'tirska', 'ivo', 'jini',
  'yret', 'ulain', 'aaso', 'äikö', 'etsö', 'yppö', 'meela', 'siuva', 'puinu', 'nulla', 'rynsä', 'vohtu',
  'kiimes', 'pilton', 'veehti', 'hoitta', 'nerppo', 'törskö', 'uvi', 'jyni', 'öryt', 'eloin', 'eeso', 'auko',
  'itsu', 'öppä', 'moole', 'siuvi', 'peina', 'nolle', 'ronsi', 'vyhtä', 'koomes', 'pylten', 'veehtu', 'hiutta',
  'narppa', 'tarsko', 'evu', 'jänä', 'urit', 'ilain', 'oose', 'yikö', 'atsa', 'ippo', 'möölä', 'sievy', 'puini',
  'nello', 'rensa', 'vähte', 'kaamis', 'palten', 'voohta', 'hoitti', 'nurppe', 'tarsku']

export default function Words() {
  const [firstname, setFirstname] = useState('');
  const [difficulty, setDifficulty] = useState(0) //ensin valitaan taso, ts kuinka vaikeita sanoja
  const [words, setWords] = useState([])

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const firstname = await AsyncStorage.getItem('@firstname');
      if (firstname !== null) {
        setFirstname(firstname);
      }
    } catch (e) {
      console.log('error: ' + e)
    }
  }

  function getSelectedLvlWords(difficulty) {
    const tempWords = []
    if (difficulty === 1) {
      for (let i = 0; i < words1.length; i++) {
        tempWords.push(words1[i])
      }
    }
    if (difficulty === 2) {
      for (let i = 0; i < words2.length; i++) {
        tempWords.push(words2[i])
      }
    }
    if (difficulty === 3) {
      for (let i = 0; i < words3.length; i++) {
        tempWords.push(words3[i])
      }
    }
    if (difficulty === 4) {
      for (let i = 0; i < words4.length; i++) {
        tempWords.push(words4[i])
      }
    }
    if (difficulty === 5) {
      for (let i = 0; i < words5.length; i++) {
        tempWords.push(words5[i])
      }
    }
    if (difficulty === 6) {
      for (let i = 0; i < words6.length; i++) {
        tempWords.push(words6[i])
      }
    }
    //tilapäinen array sekoitetuille sanoille
    let tempRandArr = []
    let length = (tempWords.length - 1)
    //arpoo numeron väliltä 0-pituus, kunnes laskuri on 0
    for (let usedWords = 0; usedWords <= length; usedWords++) {
      let random = Math.floor(Math.random() * (tempWords.length))
      let randomWord = tempWords[random]
      tempRandArr.push(randomWord)
      tempWords.splice(random, 1)
    }
    setWords(tempRandArr)
  }

  //funktio tason muuttujan nollaukseen
  function resetLevel() {
    setDifficulty(0)
    done = 0
  }

  //jos tasoa ei ole valittu
  if (difficulty === 0) {
    return (

      <View style={styles.frontContainer}>
        <View style={styles.header}>
          <Image source={require('./logo.jpg')} style={styles.logoHomepage} />
        </View>
        <Text style={styles.textHeader2}>Valitse vaikeustaso</Text>
        <Text></Text>
        <ScrollView style={styles.chooseLvl}>
          <Pressable
            title='1'
            onPress={() => {
              let helper = 1
              setDifficulty(helper)
              getSelectedLvlWords(helper);
            }}>
            <Text style={styles.choice}>1. Lyhyet, tavutetut sanat</Text>
          </Pressable>
          <Text style={styles.line} />
          <Pressable
            title='2'
            onPress={() => {
              let helper = 2
              setDifficulty(helper)
              getSelectedLvlWords(helper);
            }}>
            <Text style={styles.choice}>2. Lyhyet sanat</Text>
          </Pressable>
          <Text style={styles.line} />
          <Pressable
            title='3'
            onPress={() => {
              let helper = 3
              setDifficulty(helper)
              getSelectedLvlWords(helper);
            }}>
            <Text style={styles.choice}>3. Pidemmät, tavutetut sanat</Text>
          </Pressable>
          <Text style={styles.line} />
          <Pressable
            title='4'
            onPress={() => {
              let helper = 4
              setDifficulty(helper)
              getSelectedLvlWords(helper);
            }}>
            <Text style={styles.choice}>4. Pidemmät sanat</Text>
          </Pressable>
          <Text style={styles.line} />
          <Pressable
            title='5'
            onPress={() => {
              let helper = 5
              setDifficulty(helper)
              getSelectedLvlWords(helper);
            }}>
            <Text style={styles.choice}>5. Pitkät sanat</Text>
          </Pressable>
          <Text style={styles.line} />
          <Pressable
            title='6'
            onPress={() => {
              let helper = 6
              setDifficulty(helper)
              getSelectedLvlWords(helper);
            }}>
            <Text style={styles.choice}>6. Epäsanat</Text>
          </Pressable>
          <Text style={styles.line} />
          <Text></Text>
        </ScrollView>
        <Footer done={done} right={right} />
      </View>

    );
  }

  //jos taso on 1
  else if (difficulty === 1) {
    const time = 30
    return (
      <View style={styles.frontContainer} >
        <View style={styles.right}>
          <Pressable
            style={styles.change}
            title='change'
            onPress={() => {
              resetLevel();
            }} >
            <MaterialCommunityIcons
              name='swap-vertical'
              size={25}
              color={'black'}
            >
            </MaterialCommunityIcons>
          </Pressable>
        </View>
        <WordsTable words={words} time={time} />
        <Footer done={done} right={right} />
      </View>
    );
  }

  //jos taso on 2
  else if (difficulty === 2) {
    const time = 20
    return (
      <View style={styles.frontContainer} >
        <View style={styles.right}>
          <Pressable
            style={styles.change}
            title='change'
            onPress={() => {
              resetLevel();
            }} >
            <MaterialCommunityIcons
              name='swap-vertical'
              size={25}
              color={'black'}
            >
            </MaterialCommunityIcons>
          </Pressable>
        </View>
        <WordsTable words={words} time={time} />
        <Footer done={done} right={right} />
      </View>
    );
  }

  //jos taso on 3
  else if (difficulty === 3) {
    const time = 15
    return (
      <View style={styles.frontContainer}>
        <View style={styles.right}>
          <Pressable
            style={styles.change}
            title='change'
            onPress={() => {
              resetLevel();
            }} >
            <MaterialCommunityIcons
              name='swap-vertical'
              size={25}
              color={'black'}
            >
            </MaterialCommunityIcons>
          </Pressable>
        </View>
        <WordsTable words={words} time={time} />
        <Footer done={done} right={right} />
      </View>
    );
  }
  //jos taso on 4
  else if (difficulty === 4) {
    const time = 15
    return (
      <View style={styles.frontContainer}>
        <View style={styles.right}>
          <Pressable
            style={styles.change}
            title='change'
            onPress={() => {
              resetLevel();
            }} >
            <MaterialCommunityIcons
              name='swap-vertical'
              size={25}
              color={'black'}
            >
            </MaterialCommunityIcons>
          </Pressable>
        </View>
        <WordsTable words={words} time={time} />
        <Footer done={done} right={right} />
      </View>
    );
  }
  //jos taso on 5
  else if (difficulty === 5) {
    const time = 15
    return (
      <View style={styles.frontContainer}>
        <View style={styles.right}>
          <Pressable
            style={styles.change}
            title='change'
            onPress={() => {
              resetLevel();
            }} >
            <MaterialCommunityIcons
              name='swap-vertical'
              size={25}
              color={'black'}
            >
            </MaterialCommunityIcons>
          </Pressable>
        </View>
        <WordsTable words={words} time={time} />
        <Footer done={done} right={right} />
      </View>
    );
  }
  //jos taso on 6
  else if (difficulty === 6) {
    const time = 15
    return (
      <View style={styles.frontContainer}>
        <View style={styles.right}>
          <Pressable
            style={styles.change}
            title='change'
            onPress={() => {
              resetLevel();
            }} >
            <MaterialCommunityIcons
              name='swap-vertical'
              size={25}
              color={'black'}
            >
            </MaterialCommunityIcons>
          </Pressable>
        </View>
        <WordsTable words={words} time={time} />
        <Footer done={done} right={right} />
      </View>
    );
  }
}


