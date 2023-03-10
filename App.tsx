import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

interface HelloWorldProps{
  shouldRenderWorld : boolean;
}

function HelloWorld(props: HelloWorldProps){
  return (
    <View style={helloWorldStyles.container}>
      <Text style={helloWorldStyles.text}>Hello</Text>
      {props.shouldRenderWorld && <Text>World</Text>}
    </View>
  );
}


export default function App() {
  return (
    <View style={styles.container}>
      <HelloWorld shouldRenderWorld={false} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const helloWorldStyles = StyleSheet.create({
  text:{
    width:"100%",
    textAlign:"left",
    fontWeight:"bold",
    fontSize:30,
  },
  container:{
    width:"100%",
    alignItems:"center",
    padding:15
  }
})
