import React, { useEffect, useState } from 'react';
import { ip, mainColor, secondColor, thirdColor } from '../Variable'; 
import { View, 
         ScrollView, 
         StyleSheet, 
         Dimensions, 
         Text } from 'react-native';
import axios from 'react-native-axios';

const gradeEx = [
  {
    name: 'Limba Romana',
    grades: [10, 9, 9],
    plus: 0,
    minus: 0
  },
  {
    name: 'Matematica',
    grades: [10, 9, 10],
    plus: 3,
    minus: 0
  },
  {
    name: 'Logica',
    grades: [],
    plus: 3,
    minus: 0
  },
];

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default Grades = (props) => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    axios.post(ip + '/getGrades', {
      id: props.userData.id
    })
    .then(({ data }) => {
      setGrades(data);
    })
  }, [])

  return (
    <>
      <View style={{ height: (windowWidth / 100) * 30, width: windowWidth }} />
      <ScrollView>
          {grades.map(grade => 
            <GradeCard key={ grade.name } grade={ grade }/> 
          )}
      </ScrollView>

      <NavBar
        text={'Note'}
        setPage={props.setPage}
        userData={props.userData}
        setUserData={props.setUserData}
        setLoggedIn={props.setLoggedIn}
      />
    </>
  );
};

const GradeCard = ({ grade }) => {

    const Grade = ({ number }) => {
      return (
        <View style={ styles.grade }>
          <Text style={ styles.text }>
            {number}
          </Text>
        </View>
      )
    }

    let keyVar = 0;
    return (
        <View style={ styles.gradeContainer }>
            <Text style={ styles.name }>
              { grade.name }
            </Text>
            <Text style={[ styles.name, { fontSize: windowWidth / 100 * 5, opacity: 0.75 } ]}>
              Media: { grade.grades.length ? Math.round(grade.grades.reduce((acc, curr) => acc + curr) / grade.grades.length): 0 }
            </Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ width: windowWidth / 100 * 80 }}>
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                  { grade.grades.map(grade => <Grade key={ keyVar++ } number={grade} />) }
                </View>
              </View>
              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Text style={ styles.plusMinus }>
                  { grade.plus + ' +' }
                </Text>
                <Text style={ styles.plusMinus }>
                  { grade.minus + ' -' }
                </Text>
              </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  gradeContainer: {
    width: windowWidth,
    minHeight: windowWidth / 100 * 30,
    marginBottom: windowWidth / 100 * 5,
  },
  name: {
    marginLeft: windowWidth / 100 * 5,
    fontSize: windowWidth / 100 * 7,
    color: secondColor,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  grade: { 
    backgroundColor: secondColor, 
    borderRadius: windowWidth / 100 * 2.5, 
    width: windowWidth / 100 * 20, 
    height: windowWidth / 100 * 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: windowWidth / 100 * 5,
    marginTop: windowWidth / 100 * 5
  },
  text: {
    fontSize: windowWidth / 100 * 7.5,
    color: mainColor,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  plusMinus: {
    fontSize: windowWidth / 100 * 6,
    color: secondColor,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    marginLeft: windowWidth / 100 * 5
  }
});
