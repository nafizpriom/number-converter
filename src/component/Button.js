import React from 'react'

export default function Button({ number, isChinese, main, setChinese, setPinyin }) {

  const basic = () => {
    const [chineseChar, pinyinText] = main(number)
    setChinese(chineseChar);
    console.log(pinyinText)
    setPinyin(pinyinText);
  }

  return (
    <button className="convert" onClick={() => isChinese ? main(number) : basic(number)}>
      Convert To {isChinese ? 'English' : 'Chinese'} 
    </button>
  )
}
