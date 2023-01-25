/* eslint-disable no-unused-expressions */
import React, { useState} from 'react'
import './App.css'
import Input from './component/Input'
import Keyboard from './component/Keyboard'
import Button from './component/Button'

export const numContext = React.createContext()

function App() {
  const [chinese, setChinese] = useState('')
  const [english, setEnglish] = useState('')
  const [pinyin, setPinyin] = useState('')
  const [isChinese, setIsChinese] = useState(true) // Chinese to English flip is true;

  const chineseNumMap = {
    零: 0,
    一: 1,
    二: 2,
    三: 3,
    四: 4,
    五: 5,
    六: 6,
    七: 7,
    八: 8,
    九: 9,
    十: 10,
    百: 100,
    千: 1000,
    万: 10000,
    亿: 100000000,
  }
  class mainLogic {
    static uptoTen = (num) => {
      return chineseNumMap[num]
    }

    static lengthTwo = (num) => {
      let firstNumber = chineseNumMap[num[0]]
      let secondNumber = chineseNumMap[num[1]]
      let base = Math.max(firstNumber, secondNumber)
      if (base < 10) {
        console.log(9)
        return 'The number you input is not correct.'
      } else if (base === firstNumber) {
        return firstNumber + secondNumber
      } else {
        return firstNumber * secondNumber
      }
    }

    static lengthThree = (num) => {
      let firstNumber = chineseNumMap[num[0]]
      let base = chineseNumMap[num[1]]
      let secondNumber = chineseNumMap[num[2]]
      return firstNumber * base + secondNumber
    }

    static lengthThreeup = (num) => {
      let firstPart = num.slice(0, 2)
      let theRestNum = num.slice(2)
      return chineseToEnglish(firstPart) + chineseToEnglish(theRestNum)
    }
  }
  function chineseToEnglish(num) {
    let final
    num.length === 1
      ? (final = mainLogic.uptoTen(num))
      : num.length === 2
      ? (final = mainLogic.lengthTwo(num))
      : num.length === 3
      ? (final = mainLogic.lengthThree(num))
      : num.length > 3
      ? (final = mainLogic.lengthThreeup(num))
      : setEnglish('Out of Range.')

    setEnglish(final)
    setPinyin(englishToChinese(final)[1])
    return final
  }

  ///----------------------------------------------------------------------------//
  let chineseNum = {
    1: ['一', 'yī'],
    2: ['二', 'èr'],
    3: ['三', 'sān'],
    4: ['四', 'sì'],
    5: ['五', 'wǔ'],
    6: ['六', 'liù'],
    7: ['七', 'qī'],
    8: ['八', 'bā'],
    9: ['九', 'jiǔ'],
    10: ['十', 'shí'],
    0: ['', ''],
  }

  class engToChin {
    static upToEkok(engNum) {
      let decateNum = engNum.toString().split('')[0]
      let ekokNum = engNum - decateNum * 10
      let ekokNumOutput = ekokNum === 0 ? '' : `${chineseNum[ekokNum][0]}`
      let ekokNumOutputPinyin = ekokNum === 0 ? '' : `${chineseNum[ekokNum][1]}`
      return [
        `${chineseNum[decateNum][0]}${chineseNum[10][0]}${ekokNumOutput}`,
        `${chineseNum[decateNum][1]}${chineseNum[10][1]}${ekokNumOutputPinyin}`,
      ]
    }

    static upToHundred(engNum) {
      let hundredNumber = engNum.toString().split('')[0]
      let restChinese = ''
      let restPinyin = ''

      let restNum = engNum - hundredNumber * 100
      if (restNum !== 0) {
        const [chineseChar, pinyinText] = englishToChinese(restNum)
        restChinese = chineseChar
        restPinyin = pinyinText
      }

      return [
        `${chineseNum[hundredNumber][0]}百 ${restChinese}`,
        `${chineseNum[hundredNumber][1]}bǎi ${restPinyin}`,
      ]
    }

    static upToThousand(engNum) {
      let restChinese = ''
      let restPinyin = ''

      let thousandNumber = engNum.toString().split('')[0]

      let restNum = engNum - thousandNumber * 1000
      if (restNum !== 0) {
        const [chineseChar, pinyinText] = englishToChinese(restNum)
        restChinese = chineseChar
        restPinyin = pinyinText
      }

      return [
        `${chineseNum[thousandNumber][0]}千 ${restChinese}`,
        `${chineseNum[thousandNumber][1]}qiān  ${restPinyin}`,
      ]
    }

    static upToThousandFive(engNum) {
      let restChinese = ''
      let restPinyin = ''
      let thousandNumber = engNum.split('')[0]

      let restNum = engNum - thousandNumber * 10000
      if (restNum !== 0) {
        const [chineseChar, pinyinText] = englishToChinese(restNum)
        restChinese = chineseChar
        restPinyin = pinyinText
        console.log(restChinese)
        console.log(restPinyin)
      }

      return [
        `${chineseNum[thousandNumber][0]}万 ${restChinese}`,
        `${chineseNum[thousandNumber][1]}wàn  ${restPinyin}`,
      ]
    }
  }

  function englishToChinese(engNum) {
    let chineseChar
    let pinyinText
    if (engNum === '') {
      return []
    } else if (engNum < 10) {
      chineseChar = chineseNum[engNum][0]
      pinyinText = chineseNum[engNum][1]
    } else if (engNum < 100) {
      ;[chineseChar, pinyinText] = engToChin.upToEkok(engNum)
    } else if (engNum <= 999) {
      ;[chineseChar, pinyinText] = engToChin.upToHundred(engNum)
    } else if (engNum <= 9999) {
      ;[chineseChar, pinyinText] = engToChin.upToThousand(engNum)
    } else if (engNum <= 99999) {
      ;[chineseChar, pinyinText] = engToChin.upToThousandFive(engNum)
    } else {
      return ['Out of Range.']
    }

    return [chineseChar, pinyinText]
  }

  let language = isChinese
    ? { from: ['Chinses', chinese], to: ['English', english] }
    : { from: ['English', english], to: ['Chinese', chinese] }
  const change = () => {
    setChinese('')
    setEnglish('')
    setIsChinese(!isChinese)
  }


    document.title = isChinese ? 'Chinese To English' : 'English To Chinese';
  

  return (
    <numContext.Provider
      value={{
        chinese,
        isChinese,
        english,
        setChinese,
        setEnglish,
        setPinyin,
        chineseToEnglish,
        englishToChinese,
      }}
    >
      <div className="app">
        <h1>Chinese To English Number</h1>
        <hr />
        <Input
          language={language['from'][0]}
          number={isChinese ? chinese : english}
        />
        <div className="btnFlp">
          <Button
            number={isChinese ? chinese : english}
            isChinese={isChinese}
            setChinese={setChinese}
            setPinyin={setPinyin}
            main={isChinese ? chineseToEnglish : englishToChinese}
          />
          <span className="flip" onClick={() => change()}>
            &#8597;
          </span>
        </div>
        <Input
          language={language['to'][0]}
          number={isChinese ? english : chinese}
        />
        <Keyboard keyLang={isChinese} />

        <Input language="Pinyin" number={pinyin} />
      </div>
    </numContext.Provider>
  )
}

export default App
