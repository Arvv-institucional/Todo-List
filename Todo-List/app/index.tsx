import ViewModal from "@/components/ViewModal";
import EditModal from "@/components/EditModal";
import CreateModal from "@/components/CreateModal";
import TodoCard from "@/components/TodoCard";
import { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { Searchbar, Text, Button } from "react-native-paper";
import { API_URL } from "@/config/api";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const url = `${API_URL}/tasks/`;

export default function Index() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isVisibleView, setIsVisibleView] = useState(false);
  const [isVisibleEdit, setIsVisibleEdit] = useState(false);
  const [isVisibleCreate, setIsVisibleCreate] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number>(0);

  const fetchAllTasks = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setAllTasks(data.data || []);
    } catch (error) {
      console.log("error al obtener tareas", error);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const filteredTasks =
    searchQuery === ""
      ? allTasks
      : allTasks.filter((task) => {
          const title = task.title ? task.title.toLowerCase() : "";
          const query = searchQuery.toLowerCase();
          return title.includes(query);
        });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <ViewModal
        id={selectedTaskId}
        isVisibleView={isVisibleView}
        newState={() => setIsVisibleView(!isVisibleView)}
      />
      <EditModal
        id={selectedTaskId}
        isVisibleEdit={isVisibleEdit}
        newState={() => {
          setIsVisibleEdit(!isVisibleEdit);
          fetchAllTasks();
        }}
      />
      <CreateModal
        isVisibleCreate={isVisibleCreate}
        newState={() => setIsVisibleCreate(!isVisibleCreate)}
        onTaskCreated={fetchAllTasks}
      />

      <View
        style={{
          padding: 16,
          paddingBottom: 12,
          backgroundColor: "#fff",
          borderBottomWidth: 1,
          borderBottomColor: "#e0e0e0",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <Searchbar
            placeholder="Buscar tareas..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={{ flex: 1, height: 45 }}
            placeholderTextColor="#999"
          />
          <Button
            mode="contained"
            icon="plus"
            onPress={() => setIsVisibleCreate(true)}
            style={{ height: 45, justifyContent: "center" }}
            buttonColor="#5DADE2"
          >
            Crear
          </Button>
        </View>
      </View>

      <ScrollView style={{ flex: 1, paddingTop: 8, paddingBottom: 8 }}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TodoCard
              key={task.id}
              id={task.id}
              isVisibleEdit={isVisibleEdit}
              onEditPress={() => {
                setSelectedTaskId(task.id);
                setIsVisibleEdit(true);
              }}
              onViewPress={() => {
                setSelectedTaskId(task.id);
                setIsVisibleView(true);
              }}
              onRefresh={fetchAllTasks}
            />
          ))
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Text
              variant="headlineSmall"
              style={{ color: "#bbb", fontWeight: "500" }}
            >
              {searchQuery === ""
                ? "No hay tareas"
                : "No se encontraron tareas"}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}