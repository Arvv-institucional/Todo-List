import React, {useState, useEffect} from "react";
import {View} from "react-native"
import { Modal, Portal, Text, Button, Surface, Divider, Chip } from 'react-native-paper';

interface Task {
  "title": string,
  "description": string,
  "completed": boolean
}

import { API_URL } from "@/config/api";

interface ModalViewProps {
  id:number, 
  isVisibleView: boolean,
  newState: () => void
}

const url = `${API_URL}/tasks/`

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
  }, [props.id, props.isVisibleView])
  
  return(
<Portal>
    <Modal
      visible={props.isVisibleView}
      onDismiss={props.newState}
      contentContainerStyle={{ padding: 20 }}
    >
      <Surface style={{ padding: 20, borderRadius: 12, backgroundColor: 'white' }} elevation={5}>
        <Text variant="headlineSmall" style={{ fontWeight: 'bold', marginBottom: 12, color: '#1a1a1a' }}>
          {task?.title}
        </Text>
        
        <Divider style={{ marginBottom: 16 }} />

        <Text variant="bodyMedium" style={{ color: '#666', marginBottom: 6, fontWeight: '500' }}>
          Descripción:
        </Text>
        <Text variant="bodyLarge" style={{ marginBottom: 20, color: '#333' }}>
          {task?.description}
        </Text>

        <Divider style={{ marginBottom: 16 }} />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
          <Text variant="bodyMedium" style={{ marginRight: 12, fontWeight: '500', color: '#666' }}>Estado:</Text>
          <Chip 
            icon={task?.completed ? "check-circle" : "clock-outline"}
            selectedColor={task?.completed ? "#27ae60" : "#f39c12"}
            style={{ backgroundColor: task?.completed ? "#d5f4e6" : "#fef5e7" }}
          >
            {task?.completed ? "Completada" : "En Proceso"}
          </Chip>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <Button  
            mode="contained"
            onPress={props.newState}
            buttonColor="#5DADE2"
          >
            Cerrar
          </Button>
        </View>
      </Surface>
    </Modal>
  </Portal>
);
}