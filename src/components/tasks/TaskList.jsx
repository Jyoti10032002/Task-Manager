import TaskCard from './TaskCard';

const TaskList = ({ tasks, searchQuery = '', showManageActions = true, ...actions }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          searchQuery={searchQuery}
          showManageActions={showManageActions}
          {...actions}
        />
      ))}
    </div>
  );
};

export default TaskList;
