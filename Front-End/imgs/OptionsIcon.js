import React from 'react'
import { ip, mainColor, secondColor, thirdColor } from '../Variable'; 
import Svg, { Path } from 'react-native-svg'

export default OptionsIcon = (props) => {
    return (
        <Svg
            width={1000}
            height={1000}
            viewBox='0 0 25 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <Path
                d='M0 2a2 2 0 012-2h21a2 2 0 110 4H2a2 2 0 01-2-2zM0 18a2 2 0 012-2h21a2 2 0 110 4H2a2 2 0 01-2-2zM0 10a2 2 0 012-2h21a2 2 0 110 4H2a2 2 0 01-2-2z'
                fill={secondColor}
            />
        </Svg>
    )
}


