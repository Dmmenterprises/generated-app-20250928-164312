import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, ListTodo } from 'lucide-react';
import { useTodoStore } from '@/stores/todoStore';
import { TaskItem } from '@/components/TaskItem';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toaster, toast } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { Filter } from '@/types';
export function HomePage() {
  const [newTodoText, setNewTodoText] = useState('');
  const todos = useTodoStore((state) => state.todos);
  const filter = useTodoStore((state) => state.filter);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const setFilter = useTodoStore((state) => state.setFilter);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      addTodo(newTodoText.trim());
      setNewTodoText('');
      toast.success('Task added!', {
        description: `"${newTodoText.trim()}" is now on your list.`,
      });
    }
  };
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);
  const activeCount = useMemo(() => todos.filter(todo => !todo.completed).length, [todos]);
  const completedCount = useMemo(() => todos.length - activeCount, [todos, activeCount]);
  const filterButtons: { label: string; value: Filter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];
  return (
    <>
      <main className="min-h-screen w-full bg-slate-50 dark:bg-gray-900 text-foreground transition-colors duration-300">
        <div className="absolute inset-0 -z-0 h-full w-full bg-white dark:bg-gray-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-0 m-auto h-[310px] w-[310px] rounded-full bg-indigo-400 opacity-20 blur-[100px]"></div>
        <ThemeToggle className="fixed top-6 right-6" />
        <div className="relative z-10 flex min-h-screen flex-col items-center p-6 sm:p-8">
          <div className="w-full max-w-2xl">
            <header className="my-8 text-center">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                Zenitho
              </h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                The minimalist to-do list for ultimate focus.
              </p>
            </header>
            <motion.div layout className="mb-6">
              <form onSubmit={handleAddTodo} className="flex items-center gap-2">
                <Input
                  type="text"
                  value={newTodoText}
                  onChange={(e) => setNewTodoText(e.target.value)}
                  placeholder="What needs to be done?"
                  className="h-12 flex-grow rounded-md border-2 border-transparent bg-white/80 px-4 text-lg shadow-sm backdrop-blur-sm transition-all duration-300 focus:border-indigo-500/50 focus:bg-white/90 focus:ring-2 focus:ring-indigo-500/50 dark:bg-gray-800/80 dark:focus:bg-gray-800/90"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="h-12 w-12 flex-shrink-0 rounded-md bg-indigo-600 text-white shadow-lg transition-all duration-300 hover:bg-indigo-700 hover:scale-105 active:scale-95"
                  aria-label="Add new task"
                >
                  <Plus className="h-6 w-6" />
                </Button>
              </form>
            </motion.div>
            <motion.div layout className="space-y-3">
              <AnimatePresence>
                {filteredTodos.length > 0 ? (
                  filteredTodos.map((todo) => (
                    <TaskItem
                      key={todo.id}
                      todo={todo}
                      toggleTodo={toggleTodo}
                      deleteTodo={deleteTodo}
                    />
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 p-12 text-center"
                  >
                    <ListTodo className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                      {filter === 'completed' ? "No completed tasks" : "All clear!"}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {filter === 'completed' ? "Get to work and check some off!" : "Add a new task to get started."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            {todos.length > 0 && (
              <motion.footer 
                layout
                className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg bg-card/50 dark:bg-card/30 p-4 border"
              >
                <span className="text-sm font-medium text-muted-foreground">
                  {activeCount} {activeCount === 1 ? 'task' : 'tasks'} left
                </span>
                <div className="flex items-center justify-center gap-2 rounded-md bg-slate-200/80 dark:bg-gray-800/80 p-1">
                  {filterButtons.map(({ label, value }) => (
                    <Button
                      key={value}
                      onClick={() => setFilter(value)}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        'px-3 py-1 h-auto transition-colors duration-300',
                        filter === value
                          ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                          : 'text-muted-foreground hover:bg-white/50 dark:hover:bg-gray-700/50'
                      )}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    clearCompleted();
                    toast.info('Completed tasks cleared.');
                  }}
                  className={cn(
                    "text-muted-foreground transition-opacity duration-300 hover:text-destructive",
                    completedCount > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  )}
                  disabled={completedCount === 0}
                >
                  Clear Completed
                </Button>
              </motion.footer>
            )}
          </div>
        </div>
      </main>
      <Toaster richColors position="bottom-right" />
    </>
  );
}