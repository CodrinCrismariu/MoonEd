import React from 'react'
import Svg, { Path } from 'react-native-svg'

export default SvgComponent = (props) => {
  return (
    <Svg
      width={1000}
      height={1000}
      viewBox='0 0 33 30'
      fill='none'
      {...props}
    >
      <Path
        fill='#BABABA'
        d='M.384 28.15l9.643-19.909 1.998 1.499-9.643 19.91z'
      />
      <Path
        fill='#BABABA'
        d='M10.209 8.71l17.286 8.75-.879 2.688-17.286-8.75z'
      />
      <Path fill='#BABABA' d='M24.517 19.116l6.328-19L33 1.23l-6.328 18.999z' />
      <Path
        fill='#272727'
        d='M7.622 5l17.286 8.75-.672 2.054-17.285-8.75zM10.89 12.176l18.187 9.206-.791 2.42-18.187-9.205z'
      />
    </Svg>
  )
}
