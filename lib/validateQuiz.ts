export type Quiz = {
  questions: { question: string; options: string[]; answer: string }[];
};

export function validateQuiz(quiz: Quiz): boolean {
  if (!quiz || !Array.isArray(quiz.questions)) return false;
  return quiz.questions.every((q) => q.question && q.options && q.answer !== undefined);
}
