import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Card, Text, Button, Checkbox, IconButton } from 'react-native-paper';

interface Task {
  'title': string
  'description': string
  'completed': boolean
}

import { API_URL } from "@/config/api";

interface TodoCardProps {
  id: number
  onEditPress: () => void
  onViewPress: () => void
  onRefresh: () => void
}

const url = `${API_URL}/tasks/`;

export default function TodoCard(props: TodoCardProps) {
  const [task, setTask] = useState<Task | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTask = async () => {
    try {
      const response = await fetch(url + props.id);
      const data = await response.json();
      const wantedTask: Task = data.data;
      setTask(wantedTask);
      setIsCompleted(wantedTask.completed);
      setLoading(false);
    } catch (error) {
      console.log(error);
      const wantedTaskError: Task = {
        "title": "Tarea no disponible",
        "description": "Ha habido un problema en la tarea intentelo mas tarde",
        "completed": false
      };
      setTask(wantedTaskError);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [props.id]);

  const toggleCompleted = async () => {
    try {
      await fetch(url + props.id, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'title': task?.title,
          'description': task?.description,
          'completed': !isCompleted
        })
      });
      setIsCompleted(!isCompleted);
    } catch (error) {
      console.log("error al cambiar estado", error);
    }
  };

  const deleteTask = async () => {
    try {
      await fetch(url + props.id, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("tarea eliminada");
      props.onRefresh();
    } catch (error) {
      console.log("error al eliminar", error);
    }
  };

  if (loading) {
    return (
      <Card style={{ marginHorizontal: 10, marginBottom: 10 }}>
        <Card.Content>
          <Text>Cargando...</Text>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card style={{ marginHorizontal: 12, marginBottom: 12, backgroundColor: '#fff' }}>
      <Card.Content>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 }}>
          <Checkbox
            status={isCompleted ? 'checked' : 'unchecked'}
            onPress={toggleCompleted}
            color="#5DADE2"
          />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text
              variant="titleMedium"
              style={{
                fontWeight: '600',
                textDecorationLine: isCompleted ? 'line-through' : 'none',
                color: isCompleted ? '#999' : '#1a1a1a'
              }}
            >
              {task?.title}
            </Text>
            <Text variant="labelSmall" style={{ color: '#aaa', marginTop: 6, fontSize: 12 }}>
              ID: {props.id}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#f0f0f0' }}>
          <Button
            mode="outlined"
            onPress={props.onViewPress}
            size="small"
            style={{ borderColor: '#5DADE2' }}
            textColor="#5DADE2"
          >
            Ver
          </Button>

          <Button
            mode="outlined"
            onPress={props.onEditPress}
            size="small"
            style={{ borderColor: '#17a2b8' }}
            textColor="#17a2b8"
          >
            Editar
          </Button>

          <IconButton
            icon="delete"
            iconColor="#dc3545"
            size={22}
            onPress={deleteTask}
            style={{ margin: 0 }}
          />
        </View>
      </Card.Content>
    </Card>
  );
}
