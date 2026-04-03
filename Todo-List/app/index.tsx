import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { FAB, Provider as PaperProvider, Text } from "react-native-paper";
import AddTask from "@/components/AddTask"; 
import TareaCard from "@/components/TareaCard"; 

const url = "http://localhost:3000/tasks/"; 

export default function Index() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tareas, setTareas] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setTareas(result.data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    fetchTasks(); 
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>Mis Tareas</Text>
        
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          {tareas?.map((item: any) => (
            <TareaCard
              key={item.id}
              id={item.id.toString()}
              nombre={item.title}
              estado={item.estado || "Pendiente"}
              onPressDelete={() => {
                console.log("Borrar", item.id);
              }}
            />
          ))}
        </ScrollView>

        <AddTask 
          id={tareas.length + 1} 
          isVisibleAdd={isModalVisible} 
          createTask={toggleModal} 
        />

        <FAB
          icon="plus"
          label="Nueva Tarea"
          style={styles.fab}
          onPress={() => setIsModalVisible(true)}
        />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    margin: 20,
    fontWeight: "bold",
    color: "#333",
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});