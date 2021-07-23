import React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'

export default HumanIcon = (props) => {
  return (
    <Svg
      width={1000}
      height={1000}
      viewBox='0 0 26 29'
      fill='none'
      {...props}
    >
      <Circle cx={12.8572} cy={7.00001} r={6.42857} fill='#BABABA' />
      <Circle cx={12.8571} cy={7.00003} r={3.85714} fill='#272727' />
      <Path
        d='M25.286 25.872C22 27.5 20.364 28 13.5 28s-10 .515-13.071-2.128c0-6.864 5.564-12.429 12.428-12.429 6.864 0 12.429 5.565 12.429 12.429z'
        fill='#BABABA'
      />
      <Path
        d='M23 26c-3-.5-4.977-.5-10.5-.5s-9.488 0-9.5.5c0-5.523 4.477-10 10-10s10 4.477 10 10z'
        fill='#272727'
      />
      <Path
        fill='#BABABA'
        d='M0.428589 25.4286H25.285688999999998V28.00003H0.428589z'
      />
    </Svg>
  )
}

