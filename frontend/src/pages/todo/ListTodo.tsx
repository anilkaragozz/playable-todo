import { DataTable } from "@/components/data-table";
import { Todos, columns } from "@/pages/todo/TodoTableColumn";
import { getTodosInstance } from "@/api/apiClient";
import { useState, useEffect } from "react";

const Todo = () => {
  const [todos, setTodos] = useState<Todos[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const todosData = await getTodosInstance();
      setTodos(todosData);
    };

    fetchTodos();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={todos} />
    </div>
  );
};

export default Todo;
