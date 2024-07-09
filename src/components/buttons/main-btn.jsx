import React from 'react'

const MainButton = ({children, styling, isDisabled, onClick}) => {
  return (
    <button className={'main-btn ' + (styling ? styling : '') + (isDisabled ? ' disabled ' : '')}
        onClick={(e) => onClick && onClick(e)} disabled={isDisabled}>
        {children}
    </button>
  )
}

export default MainButton