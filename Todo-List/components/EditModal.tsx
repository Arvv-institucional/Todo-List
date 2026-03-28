import React, {useState, useEffect} from "react";
import {Modal, View, Text, Pressable, StyleSheet, TextInput} from "react-native"
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

interface Task {
  'title' : string
  'description' : string
  'completed' : boolean
}

interface ModalViewProps {
  id : number
  isVisibleEdit: boolean
  newState : () => void
}



const url = 'http://localhost:3000/tasks/'

export default function EditModal(props: ModalViewProps) {
  
  const [task, setTask] = useState< Task | null >(null)
  const [newTitle, setNewTitle] = useState<string>('')
  const [newDescription, setNewDescription] = useState<string>('')

  
    const fetchTask = async () => {
    try {
      const response = await fetch(url+props.id)
      const data = await response.json()
      const wantedTask : Task = data.data
      setTask(wantedTask)
    } catch (error) {
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

  useEffect(()=>{
    if (task) {
      setNewTitle(task.title)
      setNewDescription(task.description)
    }
  }, [task])

  function editTaskOnPress(){
    const editTask = async ()=>{
      try {
            const response = await fetch(url+props.id, {
              method: "PUT",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({'title' : newTitle, 'description' : newDescription, 'completed' : false})
            })
            const data = await response.json()
            console.log("success")
            props.newState()
      } catch (error) {
        console.log("error al editar", error)
        props.newState()
      }
    }
  editTask()
  }
  


  return(
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal visible={props.isVisibleEdit} style={styles.modalView} 
        animationType="slide" transparent = {true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}> title: </Text>
              <TextInput placeholder={task?.title} value={newTitle} onChangeText={setNewTitle}
              />
              <Text style={styles.textStyle}> </Text>
              <Text style={styles.modalText}> Description: </Text>
              <TextInput placeholder={task?.description} value={newDescription} onChangeText={setNewDescription}
              />
              <Text style={styles.textStyle}> </Text>
              <Pressable onPress={editTaskOnPress} style={styles.buttonSave}>
                <Text style={styles.textStyle}> Guardar </Text>
              </Pressable>
              <Text style={styles.textStyle}> </Text>
              <Pressable onPress={props.newState} style={styles.buttonClose}>
                <Text style={styles.textStyle}> salir </Text>
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

  buttonSave: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center'
  },
    buttonClose: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#f45454',
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
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 20,
  },
  badgeProceso: {
    backgroundColor: '#FFF4E5',
  },
  textProceso: {
    color: '#B76E00',
    fontSize: 14,
    fontWeight: 'bold',
  },
  badgeCompletada: {
    backgroundColor: '#E8F5E9', 
  },
  textCompletada: {
    color: '#2E7D32', 
    fontSize: 14,
    fontWeight: 'bold',
  }
})