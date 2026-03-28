import React, {useState, useEffect} from "react";
import {View} from "react-native"
import { Modal, Portal, TextInput, Button, Text, Surface } from 'react-native-paper';

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
  <Portal> 
    <Modal 
      visible={props.isVisibleEdit} 
      onDismiss={props.newState} 
      contentContainerStyle={{ padding: 20 }}
    >
      <Surface style={{ padding: 20, borderRadius: 12, backgroundColor: 'white' }} elevation={5}>
        <Text variant="headlineSmall" style={{ marginBottom: 20, fontWeight: 'bold' }}>
          Editar Tarea
        </Text>

        <TextInput
          label="Título"
          mode="outlined"
          contentStyle={{ paddingHorizontal: 10 }}
          placeholder={task?.title}
          value={newTitle}
          onChangeText={setNewTitle}
          style={{height: 55, marginBottom: 15, backgroundColor: 'white' }}
        />

        <TextInput
          label="Descripción"
          mode="outlined"
          contentStyle={{ paddingHorizontal: 10 }}
          placeholder={task?.description}
          value={newDescription}
          onChangeText={setNewDescription}
          multiline
          numberOfLines={3}
          style={{height: 55, marginBottom: 25, backgroundColor: 'white' }}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
          <Button 
            mode="text" 
            onPress={props.newState}
            textColor="gray"
          >
            Cancelar
          </Button>
          
          <Button 
            mode="contained" 
            onPress={editTaskOnPress}
            icon="content-save"
          >
            Guardar
          </Button>
        </View>
      </Surface>
    </Modal>
  </Portal>
);
}