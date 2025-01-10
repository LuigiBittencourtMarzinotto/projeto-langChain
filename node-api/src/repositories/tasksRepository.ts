interface Task {
  id: number;
  text: string;
  lang: string;
  summary: string | null;
}

export class TasksRepository {
  private tasks: Task[] = [];
  private currentId: number = 1;

  createTask(text: string, lang: string): Task {
    const task: Task = {
      id: this.currentId++,
      text: text,
      lang: lang,
      summary: null
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(id: number, summary: string): Task | null {
    const taskIndex = this.tasks.findIndex(t => t.id === id);
    if (taskIndex > -1) {
      this.tasks[taskIndex].summary = summary;
      return this.tasks[taskIndex];
    }
    return null;
  }

  getTaskById(id: number): Task | null {
    return this.tasks.find(t => t.id === id) || null;
  }

  deleteTaskById(id: number): String | null {
    let index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return `Tarefa com o Id ${id} foi excluido com sucesso`;
    }
    return "Tarefa não encontrada";
  }

  
  getAllTasks(): Task[] {
    return this.tasks;
  }
}