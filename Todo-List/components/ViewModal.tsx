import React, { useState, useEffect } from "react";
import { View } from "react-native";
import {
  Modal,
  Portal,
  Text,
  Button,
  Surface,
  Divider,
  Chip,
} from "react-native-paper";

interface Task {
  title: string;
  description: string;
  completed: boolean;
}

interface ModalViewProps {
  id: number;
  isVisibleView: boolean;
  newState: () => void;
}

const url = "http://localhost:3000/tasks/";

export default function ViewModal(props: ModalViewProps) {
  const [task, setTask] = useState<Task | null>(null);

  const fetchTask = async () => {
    try {
      const response = await fetch(url + props.id);
      const data = await response.json();
      const wantedTask: Task = data.data;
      setTask(wantedTask);
    } catch (error) {
      console.log(error);
      const wantedTaskError: Task = {
        title: "Tarea no disponible",
        description: "Ha habido un problema en la tarea intentelo mas tarde",
        completed: false,
      };
      setTask(wantedTaskError);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [props.id, props.isVisibleView]);

  return (
    <Portal>
      <Modal
        visible={props.isVisibleView}
        onDismiss={props.newState}
        contentContainerStyle={{ padding: 20 }}
      >
        <Surface
          style={{ padding: 20, borderRadius: 12, backgroundColor: "white" }}
          elevation={5}
        >
          <Text
            variant="headlineSmall"
            style={{ fontWeight: "bold", marginBottom: 10 }}
          >
            {task?.title}
          </Text>
          <Divider style={{ marginBottom: 15 }} />
          <Text variant="bodyMedium" style={{ color: "gray", marginBottom: 5 }}>
            Descripción:
          </Text>
          <Text variant="bodyLarge" style={{ marginBottom: 20 }}>
            {task?.description}
          </Text>
          <Divider style={{ marginBottom: 15 }} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 25,
            }}
          >
            <Text variant="bodyMedium" style={{ marginRight: 10 }}>
              Estado:
            </Text>
            <Chip
              icon={task?.completed ? "check-circle" : "clock-outline"}
              selectedColor={task?.completed ? "green" : "orange"}
              style={{
                backgroundColor: task?.completed ? "#c6fbca" : "#fee6bf",
              }}
            >
              {task?.completed ? "Completada" : "En Proceso..."}
            </Chip>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Button mode="contained" onPress={props.newState}>
              Cerrar
            </Button>
          </View>
        </Surface>
      </Modal>
    </Portal>
  );
}
