import ViewModal from "@/components/ViewModal";
import EditModal from "@/components/EditModal";
import TodoCard from "@/components/TodoCard";
import { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { Searchbar, Text } from "react-native-paper";

interface Task {
  id: number
  title: string
  description: string
  completed: boolean
}

const url = 'http://localhost:3000/tasks/';

export default function Index() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isVisibleView, setIsVisibleView] = useState(false);
  const [isVisibleEdit, setIsVisibleEdit] = useState(false);
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

  const filteredTasks = searchQuery === '' 
    ? allTasks 
    : allTasks.filter(task => {
        const title = task.title ? task.title.toLowerCase() : '';
        const query = searchQuery.toLowerCase();
        return title.includes(query);
      });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ViewModal id={selectedTaskId} isVisibleView={isVisibleView} newState={() => setIsVisibleView(!isVisibleView)} />
      <EditModal id={selectedTaskId} isVisibleEdit={isVisibleEdit} newState={() => {
        setIsVisibleEdit(!isVisibleEdit);
        fetchAllTasks();
      }} />
      
      <View style={{ padding: 15, backgroundColor: '#fff' }}>
        <Searchbar
          placeholder="Buscar tareas..."
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>

      <ScrollView style={{ flex: 1, paddingTop: 15 }}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TodoCard
              key={task.id}
              id={task.id}
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
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Text variant="headlineSmall" style={{ color: '#999' }}>
              {searchQuery === '' ? 'No hay tareas' : 'No se encontraron tareas'}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
