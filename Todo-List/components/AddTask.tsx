import React, { useState, useEffect } from "react";
import { View } from "react-native";
import {
  Modal,
  Portal,
  TextInput,
  Button,
  Text,
  Surface,
} from "react-native-paper";

interface Task {
  title: string;
  description: string;
}

interface ModalViewProps {
  id: number;
  isVisibleAdd: boolean;
  createTask: () => void;
}

const url = "http://localhost:3000/tasks/";

export default function AddTask(props: ModalViewProps) {
  const [task, setTask] = useState<Task | null>(null);
  const [Title, setTitle] = useState<string>("");
  const [Description, setDescription] = useState<string>("");



  function AddOnPress() {
    const addTask = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: Title,
            description: Description,
            estado: "Pendiente", // Agregamos esto para que el Card tenga qué mostrar
          }),
        });

        if (response.ok) {
          console.log("¡Tarea creada!");
          setTitle(""); // Limpiamos el formulario
          setDescription("");
          props.createTask(); // Esto cierra el modal y dispara el fetchTasks en el index
        }
      } catch (error) {
        console.log("error al crear tarea", error);
        props.createTask();
      }
    };
    addTask();
  }


  return (
    <Portal>
      <Modal
        visible={props.isVisibleAdd}
        onDismiss={props.createTask}
        contentContainerStyle={{ padding: 20 }}
      >
        <Surface
          style={{ padding: 20, borderRadius: 12, backgroundColor: "white" }}
          elevation={5}
        >
          <Text
            variant="headlineSmall"
            style={{ marginBottom: 20, fontWeight: "bold" }}
          >
            Crear tarea
          </Text>

          <TextInput
            label="Título"
            mode="outlined"
            contentStyle={{ paddingHorizontal: 10 }}
            placeholder={task?.title}
            value={Title}
            onChangeText={setTitle}
            style={{ height: 55, marginBottom: 15, backgroundColor: "white" }}
          />

          <TextInput
            label="Descripción"
            mode="outlined"
            contentStyle={{ paddingHorizontal: 10 }}
            placeholder={task?.description}
            value={Description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            style={{ height: 55, marginBottom: 25, backgroundColor: "white" }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 10,
            }}
          >
            <Button mode="text" onPress={props.createTask} textColor="gray">
              Cancelar
            </Button>

            <Button
              mode="contained"
              onPress={AddOnPress}
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
