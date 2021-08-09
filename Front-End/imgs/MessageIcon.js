import React from 'react'
import { ip, mainColor, secondColor, thirdColor } from '../Variable'; 
import Svg, { Ellipse, Path } from 'react-native-svg'

export default MessageIcon = (props) => {
  return (
    <Svg
      width={1000}
      height={1000}
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <Ellipse cx={16.4325} cy={12.5} rx={15.4054} ry={12.5} fill={secondColor} />
      <Path fill={mainColor} d='M2.83789 17H13.83789V30H2.83789z' />
      <Path
        transform='matrix(.90287 -.42992 .44883 .89362 .618 27.59)'
        fill={secondColor}
        d='M0 0H14.7895V3.01582H0z'
      />
      <Path
        transform='matrix(0 -1 -1 0 5.135 29)'
        fill={secondColor}
        d='M0 0H13V3.08108H0z'
      />
      <Ellipse cx={16.4325} cy={12.5} rx={12.3243} ry={9.5} fill={mainColor} />
      <Path fill={mainColor} d='M5.13525 14H6.16228V18H5.13525z' />
      <Path
        transform='rotate(-90 0 31)'
        fill={mainColor}
        d='M0 31H8V33.054050000000004H0z'
      />
      <Path fill={secondColor} d='M2.05396 26H3.08099V30H2.05396z' />
      <Path
        transform='matrix(.90287 -.42991 .44882 .89362 .988 30.754)'
        fill={mainColor}
        d='M0 0H11.2536V1.0995H0z'
      />
    </Svg>
  )
}
