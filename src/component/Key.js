import React, { useContext } from 'react'
import { numContext } from '../App'

export default function Key({ val }) {
  const {
    setChinese,
    setEnglish,
    setPinyin,
    isChinese,
    chinese,
    english,
    chineseToEnglish,
    englishToChinese,
  } = useContext(numContext)
  const change = () => {
    if (isChinese) {
      if (val === 'DEL') {
        setChinese((prev) => prev.substring(0, prev.length - 1))
        chineseToEnglish(chinese.substring(0, chinese.length - 1))
      } else {
        setChinese((prev) => prev + val[0])
      }
    } else {
      if (val === 'DEL') {
        setEnglish((prev) => prev.substring(0, prev.length - 1))
        const [chineseChar, pinyinText] = englishToChinese(english.substring(0, english.length - 1))
        setChinese(chineseChar);
        setPinyin(pinyinText);

        if ((english.substring(0, english.length - 1).length === 0)) {
          setChinese('')
          setPinyin('')
        }
      } else {
        setEnglish((prev) => prev + val)
      }
    }
  }

  return (
    <>
      {val !== 'DEL' && (
        <button className={`key`} onClick={change}>
          {' '}
          {val}{' '}
        </button>
      )}
      {val === 'DEL' && (
        <button className={`key keyDel`} onClick={change}>
          {' '}
          &#10006;{' '}
        </button>
      )}
    </>
  )
}
