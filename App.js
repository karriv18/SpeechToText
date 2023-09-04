import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Voice from '@react-native-voice/voice'
import React, {useEffect, useState} from 'react'


export default function App() {
  let [started, setStarted] = useState(false)
  let [results, setResults] = useState([])

    const startSpeechtoText = async () => {
    await Voice.start('en-NZ')
    setStarted(true)

  }

  const stopSpeechtoText = async () => {
    await Voice.stop()
    setStarted(false)
  }

  useEffect(() => {
    Voice.onSpeechError = onSpeechError
    Voice.onSpeechResults = onSpeechResults

    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [])


  const onSpeechResults = (result) => {
    setResults(result.value)
  }

  const onSpeechError = (error) => {
    console.log(error)
  }

  return (
    <View style={styles.container}>
      {!started ? 
        <Button 
        title='Start speech to text' 
        onPress={startSpeechtoText}/>: 
        undefined }
      {started ? 
        <Button 
        title='Stop speech to text' 
        onPress={stopSpeechtoText}/>: 
        undefined}
        
      {results.map((result, index) => <Text key={index}>{result}</Text>)}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
