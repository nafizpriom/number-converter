import React from 'react'

export default function Input({language, number}) {
  return (
    <>
      <div className='input'>
        <span className='inputLan'>{language} Number: </span>
        <span>{ number  }</span>
      </div>
    </>
  )
}
