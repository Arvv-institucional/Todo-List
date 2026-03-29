import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView,StyleSheet,Text} from "react-native";

import EditModal from "@/components/EditModal";
import TareaCard from "@/components/TareaCard";
import ViewModal from "@/components/ViewModal";

import {
  deleteTarea,
  getTareas,
  type Tarea,
} from "@/services/taskService";

export default function Index() {
  // --- Estado de datos ---
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Lógica de modales ---
  const [isVisibleView, setIsVisibleView] = useState(false);
  const [isVisibleEdit, setIsVisibleEdit] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(0);

  const updateStateView = (id?: number) => {
    if (id) setSelectedId(id);
    setIsVisibleView((prev) => !prev);
  };

  const updateStateEdit = (id?: number) => {
    if (id) setSelectedId(id);
    setIsVisibleEdit((prev) => !prev);
  };

  // --- Cargar tareas desde la API ---
  const fetchTareas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTareas();
      setTareas(data);
    } catch (e: any) {
      setError(e.message ?? "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTareas();
  }, [fetchTareas]);

  // --- Borrar tarea ---
 const handleDelete = async (id: number, nombre: string) => {
  const confirmed = window.confirm(`¿Deseas eliminar "${nombre}"?`);
  if (!confirmed) return;
  try {
    await deleteTarea(id);
    setTareas((prev) => prev.filter((t) => t.id !== id));
  } catch (e: any) {
    window.alert(`Error al eliminar: ${e.message}`);
  }
};

  // --- Refrescar lista después de editar ---
  const handleEditClose = () => {
    updateStateEdit();
    fetchTareas(); // recargamos para ver los cambios
  };

  // --- Helpers de visualización ---
  const getEstado = (completed: boolean) => (completed ? "Completado" : "Pendiente");

  // --- Render ---
  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#7B61FF" />
        <Text style={styles.loadingText}>Cargando tareas...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
        <Text style={styles.retryText} onPress={fetchTareas}>
          Reintentar
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Modales */}
      <ViewModal
        id={selectedId}
        isVisibleView={isVisibleView}
        newState={() => updateStateView()}
      />
      <EditModal
        id={selectedId}
        isVisibleEdit={isVisibleEdit}
        newState={handleEditClose}
      />

      <Text style={styles.title}>Mis Pendientes</Text>

      <FlatList
        data={tareas}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay tareas todavía.</Text>
        }
        renderItem={({ item }) => (
          <TareaCard
            id={String(item.id)}
            nombre={item.title}
            estado={getEstado(item.completed)}
            onPressView={() => updateStateView(item.id)}
            onPressEdit={() => updateStateEdit(item.id)}
            onPressDelete={() => handleDelete(item.id, item.title)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
    color: "#111111",
    letterSpacing: -0.5,
  },
  list: {
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F7",
    gap: 12,
  },
  loadingText: {
    color: "#999",
    fontSize: 15,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 15,
    textAlign: "center",
    paddingHorizontal: 32,
  },
  retryText: {
    color: "#7B61FF",
    fontSize: 15,
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    color: "#BBBBBB",
    marginTop: 60,
    fontSize: 16,
  },
});
