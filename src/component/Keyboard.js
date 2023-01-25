import React from 'react'
import Key from './Key'

export default function Keyboard({keyLang}) {
  const NumSet = keyLang ? [
    '一',
    '二',
    '三',
    '四(4)',
    '五(5)',
    '六(6)',
    '七(7)',
    '八(8)',
    '九(9)',
    '十',
    '百',
    '千',
    '千',
    '万',
  ]: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  
  return (
    <div className="keyboard">
      {NumSet.map((num, index) => (
        <Key val={num} key={index} />
      ))}
      <Key val="DEL" />
    </div>
  )
}
