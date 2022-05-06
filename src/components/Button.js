import React from 'react'

export default function Button({arg, label, handleClick}) {
  return (
   <button onClick={() => handleClick(arg)}>
     {label}
   </button>
  )
}
