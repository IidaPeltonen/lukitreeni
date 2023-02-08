import React, { useState, useEffect } from "react";
import { Pressable, View, Text, Image, ScrollView } from "react-native";
import styles from "../styles/styles";
import Footer from "./Footer";
import SentencesTable from "./SentencesTable";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

let right = 0
let done = 0

//tarvitaan lista sanoja
const sen1 = ['Koi-ra is-tuu', 'Lin-tu len-tää.', 'Kis-sa mau-kuu.', 'Sis-ko it-kee.', 'Äi-ti juok-see.']
const sen2 = ['Kissan nimi on Mauri.', 'Koulun ovi oli lukossa.', 'Kaali maistuu hyvältä.']
const sen3 = ['Kun aurinko paistaa kesällä, on lämmintä.', 'Se oli hieno saavutus!', 
  'Soutuveneellä voi soutaa paremmin kuin kottikärryillä.', 'Saunassa on aina kylmempää kuin pakastimessa.', 
  'Kuuntelemalla voi tietää, miltä jokin maistuu.', 'Kun televisio on rikki, sillä ei voi katsoa ohjelmia.',  
  'Rikkinäiset kengät korjataan paloasemalla.', 'Suklaarasiaa säilytetään kylpyammeessa.', 
  'Satukirjassa kerrotaan, mitä ruokaa koulussa tarjotaan.', 'Kun pudottaa kuumaan veteen jääpalan, se sulaa.',
  'Tomaatti on pienempi kuin matkalaukku.', 'Hampaat harjataan hiustenkuivaajalla.', 
  'Pölynimurilla tiskataan juomalasit.', 'Vaatteet puetaan päälle suihkun jälkeen.', 
  'Laskettelija tarvitsee suksia lasketteluun. ', 'Suklaajäätelöä syödään vasaralla.', 
  'Jos housuihin tulee tahra, ne pestään puhtaaksi', 'Päivällä on aina pimeää.', 'Välipala syödään uima-altaassa.', 
  'Jotkut lapset pelkäävät käärmeitä.', 'Jääkaappiin laitetaan sanomalehtiä.', 'Rohkea ihminen on pelokas', 
  'Silmälääkäriin mennään uimaan. ', 'Etana on hitaampi kuin pantteri.', 'Juna on suurempi kuin polkupyörä.', 
  'Lämpömittari näyttää, kuinka pitkä jokin on.', 'Puutarhassa kasvaa paljon kukkia.', 
  'Kaurakeksit tehdään voileivistä.', 'Kaikki kilpikonnat asuvat koirankopissa.', 
  'Kun lemmikkieläin sairastuu, se viedään eläinlääkäriin', 'Iltasatuja luetaan sanomalehdestä.', 
  'Mehupullosta tulee makaronia.', 'Tenniksen pelaamiseen tarvitaan tennismaila.', 'Jääkaapissa maito lämpenee.', 
  'Joutsenella on pitkä kaula.', 'Hammasharjaa käytetään syömiseen.', 
  'Polkupyörä kulkee hitaammin kuin linja-auto.', 'Paistinpannulla paistetaan lettuja.', 
  'Linnut lentävät paremmin kuin käärmeet.', 'Suulla voi maistaa.', 'Korvista kasvaa ruohoa.', 
  'Ilmapallot on täytetty jäätelöllä.', 'Käymme ruokakaupassa, jotta voisimme ostaa ruokaa.', 
  'Ihmisillä on silmät vatsassa.', 'Kiikareilla voi haistaa.', 'Kynällä voi kirjoittaa.', 
  'Jos mehulasin pudottaa pöydältä, lasi voi mennä rikki.', 'Keittoa syödään haarukalla', 'Silmällä voi haistaa.', 
  'Junat tarvitsevat keksejä liikkuakseen.', 'Palikoilla voi rakentaa.', 'Haarukka on huonekalu.', 
  'Suuressa koulussa on paljon lapsia.', 'Hämähäkki on eläin.', 'Kaikki pallot ovat vihreitä', 
  'Suihku on peseytymistä varten.', 'Banaanit kasvavat nenästä.', 'Koulussa opetellaan laskemaan.', 
  'Kukot kiekuvat aamulla.', 'Hiiri on pieni eläin.', 'Oravalla on kolme jalkaa.', 'Mehua voi juoda.', 
  'Puukko on terävä.', 'Kaloilla on höyhenet.', 'Hevoset osaavat laukata.', 'Pumpuli on kovaa.', 
  'Opettaja opettaa lukemaan', 'Porsaat osaavat röhkiä.', 'Tomaatit ovat sinisiä.', 'Lampaat osaavat pyöräillä.', 
  'Suu on punainen.']

export default function Sentences() {
  const [firstname, setFirstname] = useState('');
  const [difficulty, setDifficulty] = useState(0) //ensin valitaan taso, ts kuinka vaikeita lauseita
  const [sentences, setSentences] = useState([])

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

  //haetaan sopivan tason sanat
  function getSelectedLvlSentences(difficulty) {
    const tempSentences = []
    if (difficulty === 1) {
      for (let i = 0; i < sen1.length; i++) {
        tempSentences.push(sen1[i])
      }
    }
    if (difficulty === 2) {
      for (let i = 0; i < sen2.length; i++) {
        tempSentences.push(sen2[i])
      }
    }
    if (difficulty === 3) {
      for (let i = 0; i < sen3.length; i++) {
        tempSentences.push(sen3[i])
      }
    }
    //tilapäinen array sekoitetuille lauseille
    let tempRandArr = []
    let length = (tempSentences.length - 1)
    //arpoo numeron väliltä 0-pituus, kunnes laskuri on 0
    for (let usedSentences = 0; usedSentences <= length; usedSentences++) {
      let random = Math.floor(Math.random() * (tempSentences.length))
      let randomSen = tempSentences[random]
      tempRandArr.push(randomSen)
      tempSentences.splice(random, 1)
    }
    setSentences(tempRandArr)
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
            title='1-2 lk'
            onPress={() => {
              let helper = 1
              setDifficulty(helper)
              getSelectedLvlSentences(helper);
            }}>
            <Text style={styles.choice}>1. Lyhyet virkkeet</Text>
          </Pressable>
          <Text style={styles.line} />
          <Pressable
            title='3-4 lk'
            onPress={() => {
              let helper = 2
              setDifficulty(helper)
              getSelectedLvlSentences(helper);
            }}>
            <Text style={styles.choice}>2. Pidemmät virkkeet</Text>
          </Pressable>
          <Text style={styles.line} />
          <Pressable
            title='5-6 lk'
            onPress={() => {
              let helper = 3
              setDifficulty(helper)
              getSelectedLvlSentences(helper);
            }}>
            <Text style={styles.choice}>3. Pitkät virkkeet</Text>
          </Pressable>
          <Text style={styles.line} />
          <Text></Text>
        </ScrollView>
        <Footer done={done} right={right} />
      </View>
    );
  }

  //jos taso on 1, eli 1-2lk
  else if (difficulty === 1) {
    const time = 50
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
        <SentencesTable sentences={sentences} time={time} />
        <Footer done={done} right={right} />
      </View>
    );
  }

  //jos taso on 2, eli 3-4lk
  else if (difficulty === 2) {
    const time = 40
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
        <SentencesTable sentences={sentences} time={time} />
        <Footer done={done} right={right} />
      </View>
    );
  }

  //jos taso on 3, eli 5-6lk
  else if (difficulty === 3) {
    const time = 30
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
        <SentencesTable sentences={sentences} time={time} />
        <Footer done={done} right={right} />
      </View>
    );
  }
}


