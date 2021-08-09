import React from 'react'
import { ip, mainColor, secondColor, thirdColor } from '../Variable'; 
import Svg, { Ellipse, Path } from 'react-native-svg'

export default BookIcon = (props) => {
  return (
    <Svg
      width={1000}
      height={1000}
      viewBox='0 0 35 29'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <Path fill={secondColor} d='M0 2.75H35V29H0z' />
      <Path fill={mainColor} d='M2.625 2.75H32.375V26.375H2.625z' />
      <Path
        d='M18.375 27.25c.875-1.458 4.725-4.375 13.125-4.375M18.375 6.25C19.25 4.792 23.1 1.875 31.5 1.875M16.625 27.25C15.75 25.792 11.9 22.875 3.5 22.875M16.625 6.25C15.75 4.792 11.9 1.875 3.5 1.875'
        stroke={secondColor}
        strokeWidth={3}
      />
      <Path fill={secondColor} d='M3.5 1H6.125V23.75H3.5z' />
      <Path fill={secondColor} d='M28.875 1.875H31.5V23.75H28.875z' />
      <Path fill={secondColor} d='M15.75 5.375H19.25V26.375H15.75z' />
      <Path fill={secondColor} d='M2.625 2.75H3.5V5.375H2.625z' />
      <Path fill={secondColor} d='M31.5 2.75H32.375V5.375H31.5z' />
      <Path
        transform='rotate(-29.523 15.318 6.597)'
        fill={secondColor}
        d='M15.3184 6.59717H17.82407V9.22217H15.3184z'
      />
      <Path
        transform='rotate(-58.29 17.184 7.005)'
        fill={secondColor}
        d='M17.1843 7.00462H19.68997V8.92717H17.1843z'
      />
    </Svg>
  )
}
