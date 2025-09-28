import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Todo, Filter } from '@/types';
interface TodoState {
  todos: Todo[];
  filter: Filter;
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setFilter: (filter: Filter) => void;
  clearCompleted: () => void;
}
export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      filter: 'all',
      addTodo: (text: string) =>
        set((state) => ({
          todos: [...state.todos, { id: uuidv4(), text, completed: false }],
        })),
      toggleTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      deleteTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      setFilter: (filter: Filter) => set({ filter }),
      clearCompleted: () =>
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        })),
    }),
    {
      name: 'zenitho-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);