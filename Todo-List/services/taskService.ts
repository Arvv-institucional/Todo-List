
const BASE_URL = "http://localhost:3000/tasks";

export interface Tarea {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

// GET /todos
export async function getTareas(): Promise<Tarea[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error(`Error ${res.status}: no se pudieron cargar las tareas`);
  const json = await res.json();
  return json.data; // la API regresa { success, message, data: [...] }
}

// POST /todos
export async function createTarea(
  title: string,
  description?: string
): Promise<Tarea> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, completed: false }),
  });
  if (!res.ok) throw new Error(`Error ${res.status}: no se pudo crear la tarea`);
  return res.json();
}

// PUT /todos/:id
export async function updateTarea(
  id: number,
  fields: Partial<Omit<Tarea, "id">>
): Promise<Tarea> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });
  if (!res.ok) throw new Error(`Error ${res.status}: no se pudo actualizar la tarea`);
  return res.json();
}

// DELETE /todos/:id
export async function deleteTarea(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Error ${res.status}: no se pudo borrar la tarea`);
}
