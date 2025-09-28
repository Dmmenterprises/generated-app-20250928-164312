import * as React from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Todo } from '@/types';
import { cn } from '@/lib/utils';
interface TaskItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}
export const TaskItem: React.FC<TaskItemProps> = React.memo(({ todo, toggleTodo, deleteTodo }) => {
  const handleToggle = React.useCallback(() => {
    toggleTodo(todo.id);
  }, [toggleTodo, todo.id]);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="group flex items-center gap-4 p-4 bg-card/50 dark:bg-card/30 rounded-lg border transition-all duration-300 hover:border-indigo-500/50"
    >
      <Checkbox
        id={`task-${todo.id}`}
        checked={todo.completed}
        onCheckedChange={handleToggle}
        className="peer h-6 w-6 rounded-full border-2 data-[state=checked]:bg-indigo-600 data-[state=checked]:text-white data-[state=checked]:border-indigo-600 transition-colors"
      />
      <label
        htmlFor={`task-${todo.id}`}
        className={cn(
          'flex-grow text-lg font-medium text-foreground transition-all duration-300 cursor-pointer',
          'peer-data-[state=checked]:line-through peer-data-[state=checked]:opacity-50'
        )}
      >
        {todo.text}
      </label>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => deleteTodo(todo.id)}
        className="h-9 w-9 rounded-full text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 hover:bg-destructive/10 hover:text-destructive"
        aria-label={`Delete task: ${todo.text}`}
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </motion.li>
  );
});