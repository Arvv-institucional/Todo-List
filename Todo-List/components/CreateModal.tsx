import React, { useState } from "react";
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
  completed: boolean;
}

import { API_URL } from "@/config/api";

interface ModalCreateProps {
  isVisibleCreate: boolean;
  newState: () => void;
  onTaskCreated: () => void;
}

const url = `${API_URL}/tasks/`;

export default function CreateModal(props: ModalCreateProps) {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");

  function createTaskOnPress() {
    const createTask = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newTitle,
            description: newDescription,
            completed: false,
          }),
        });
        const data = await response.json();
        console.log("success");
        setNewTitle("");
        setNewDescription("");
        props.onTaskCreated();
        props.newState();
      } catch (error) {
        console.log("error al crear", error);
        props.newState();
      }
    };
    createTask();
  }

  return (
    <Portal>
      <Modal
        visible={props.isVisibleCreate}
        onDismiss={props.newState}
        contentContainerStyle={{ padding: 20 }}
      >
        <Surface
          style={{ padding: 20, borderRadius: 12, backgroundColor: "white" }}
          elevation={5}
        >
          <Text
            variant="headlineSmall"
            style={{ marginBottom: 20, fontWeight: "bold", color: "#1a1a1a" }}
          >
            Crear Nueva Tarea
          </Text>

          <TextInput
            label="Título"
            mode="outlined"
            contentStyle={{ paddingHorizontal: 10 }}
            placeholder="Ingrese el título"
            value={newTitle}
            onChangeText={setNewTitle}
            style={{ height: 50, marginBottom: 16, backgroundColor: "white" }}
          />

          <TextInput
            label="Descripción"
            mode="outlined"
            contentStyle={{ paddingHorizontal: 10 }}
            placeholder="Ingrese la descripción"
            value={newDescription}
            onChangeText={setNewDescription}
            multiline
            numberOfLines={4}
            style={{ height: 100, marginBottom: 24, backgroundColor: "white" }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 10,
            }}
          >
            <Button mode="text" onPress={props.newState} textColor="#666">
              Cancelar
            </Button>

            <Button
              mode="contained"
              onPress={createTaskOnPress}
              icon="plus"
              buttonColor="#5DADE2"
            >
              Crear
            </Button>
          </View>
        </Surface>
      </Modal>
    </Portal>
  );
}
