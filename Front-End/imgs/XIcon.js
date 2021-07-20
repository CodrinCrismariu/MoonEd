import React from 'react'
import Svg, { Path } from 'react-native-svg'

export default XIcon = (props) => {
  return (
    <Svg
      width={1000}
      height={1000}
      viewBox='0 0 29 29'
      fill='none'
      {...props}
    >
      <Path
        d='M.707 4.243a1 1 0 010-1.415L2.83.708a1 1 0 011.414 0l23.81 23.81a1 1 0 010 1.413l-2.121 2.122a1 1 0 01-1.415 0L.707 4.243z'
        fill='#BABABA'
      />
      <Path
        d='M24.517.707a1 1 0 011.415 0l2.12 2.121a1 1 0 010 1.415l-23.81 23.81a1 1 0 01-1.413 0L.707 25.93a1 1 0 010-1.414L24.517.707z'
        fill='#BABABA'
      />
    </Svg>
  )
}

