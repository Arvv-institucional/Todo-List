import React, {useState, useEffect} from "react";
import {Modal, View, Text, Pressable, StyleSheet, ActivityIndicator} from "react-native"
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

interface Task {
  "title": String,
  "description": String,
  "completed": boolean
}


const url = "http://localhost:3000/tasks/"

interface ModalViewProps{
id:number, 
isVisible: boolean,
newState: () => void
}

export default function ViewModal(props: ModalViewProps) {

  const [task, setTask] = useState<Task | null>(null)

  const fetchTask = async ()=>{
    try {
      const response = await fetch(url + props.id)
      const data = await response.json();
      const wantedTask : Task = data.data
      setTask(wantedTask) 
    } catch (error){
      console.log(error)
      const wantedTaskError : Task = {
        "title": "Tarea no disponible",
        "description": "Ha habido un problema en la tarea intentelo mas tarde",
        "completed": false
      }
    setTask(wantedTaskError)
    }
  }

  useEffect(()=>{
    fetchTask()
  }, [props.id])
  
  return(
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal visible={props.isVisible} style={styles.modalView} 
        animationType="slide" transparent = {true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.textTitle}> {task?.title} </Text>
              <View style={styles.separator}></View>
              <Text style={styles.textStyle}> </Text>
              <Text style={styles.modalText}> {task?.description} </Text>
              <Text style={styles.textStyle}> </Text>
              <View style={styles.separator}></View>
              <Text style={styles.modalText}> Estado: </Text>
              <View style={[styles.badgeContainer, task?.completed ? styles.badgeCompletada : styles.badgeProceso]}>
                <Text style={styles.modalText}> {task?.completed ? "Completada":"En Proceso..."} </Text>
              </View>
              <Text style={styles.textStyle}> </Text>
              <Pressable onPress={props.newState} style={styles.buttonClose}>
                <Text style={styles.textStyle}> X </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
    
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },

  modalView: {
    width: '85%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textTitle : {
    fontSize : 20,
    fontWeight : 'bold',
    color : 'black'
  },

  buttonClose: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
  },
  separator: {
    height: 1,
    backgroundColor: '#EEEEEE',
    width: '100%',
    marginVertical: 5,
  },
  badgeContainer: {
    alignSelf: 'center', // Para que no ocupe todo el ancho, solo lo que mide el texto
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 20,
  },
  // Colores para "En Proceso" (Naranja/Ámbar)
  badgeProceso: {
    backgroundColor: '#FFF4E5', // Fondo naranja muy claro
  },
  textProceso: {
    color: '#B76E00', // Texto naranja oscuro
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Colores para "Completada" (Verde)
  badgeCompletada: {
    backgroundColor: '#E8F5E9', // Fondo verde muy claro
  },
  textCompletada: {
    color: '#2E7D32', // Texto verde oscuro
    fontSize: 14,
    fontWeight: 'bold',
  }
})