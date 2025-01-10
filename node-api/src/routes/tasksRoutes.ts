import { Router, Request, Response } from "express";
import { TasksRepository } from "../repositories/tasksRepository";
import { getTranslatorLanguage, getSummaryText } from "../services/pythonService";

const router = Router();
const tasksRepository = new TasksRepository();

const validateRequiredFields = (body: any, fields: string[]) => {
  for (const field of fields) {
    if (!body[field]) {
      return { error: `Campo "${field}" é obrigatório.` };
    }
  }
  return null;
};

const isLanguageSupported  = (language: any, supportedLanguages: string[]) => {
    if (!supportedLanguages.includes(language)) {
      return { error: `Language not supported.` };
    }
  return null;
};

// POST: Cria uma tarefa e solicita resumo ao serviço Python
router.post("/", async (req: Request, res: Response) => {
  try {
    const requiredFields = ['text', 'lang']; // Parametros obrigatorios para a requisicao

    const supportedLanguages = ['pt', 'en', 'es']; // pt: Português, en: Inglês, es: Espanhol.

    const validationError = validateRequiredFields(req.body, requiredFields); // validação de parametros
    if (validationError) {
      return res.status(400).json(validationError);
    }

    const { text, lang } = req.body;

    const languageValidation  = isLanguageSupported(lang, supportedLanguages) // valida se a linguagem escolhida é suportada
    if (languageValidation ) {
      return res.status(400).json(languageValidation );
    }
    const translated_text = await getTranslatorLanguage(text, lang)
    // Cria a "tarefa"
    const task = tasksRepository.createTask(text, translated_text);

    // Deve solicitar o resumo do texto ao serviço Python
    const summary = await getSummaryText(text, lang);

    // Atualiza a tarefa com o resumo
    tasksRepository.updateTask(task.id, summary);

    return res.status(201).json({
      message: "Tarefa criada com sucesso!",
      task: tasksRepository.getTaskById(task.id),
    });
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    return res
      .status(500)
      .json({ error: "Ocorreu um erro ao criar a tarefa." });
  }
});

// GET: Lista todas as tarefas
router.get("/", (req, res) => {
  const tasks = tasksRepository.getAllTasks();
  return res.json(tasks);
});

// GET: Buscando tarefa especifica
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const idNumber = Number(id);
  if (isNaN(idNumber)) {
    return res.status(400).json({ message: "ID deve ser um número válido" });
  }
  const task = tasksRepository.getTaskById(idNumber);

  if (!task) {
    return res.status(404).json({ message: "Tarefa não encontrada" });
  }

  return res.json(task);
});

// DELETE: Excluindo tarefa especifica
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const idNumber = Number(id);
  if (isNaN(idNumber)) {
    return res.status(400).json({ message: "ID deve ser um número válido" });
  }
  const task = tasksRepository.deleteTaskById(idNumber);

  if (!task) {
    return res.status(404).json({ message: "Tarefa não encontrada" });
  }

  return res.json({ message: task});
});

export default router;
