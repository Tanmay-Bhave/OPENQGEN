import { request, toId } from "./client";
export type QuestionPayload = { questionText: string; subject: string; courseCode: string; unit: number; marks: number; co: string; bloomLevel: string; difficulty: string; questionType?: string };
export const getQuestions = async () => (await request<{ questions: any[] }>("/questions")).questions.map(toId);
export const createQuestion = async (body: QuestionPayload) => toId((await request<{ question: any }>("/questions", { method: "POST", body: JSON.stringify(body) })).question);
export const updateQuestion = async (id: string, body: Partial<QuestionPayload>) => toId((await request<{ question: any }>(`/questions/${id}`, { method: "PUT", body: JSON.stringify(body) })).question);
export const deleteQuestion = (id: string) => request<{ message: string }>(`/questions/${id}`, { method: "DELETE" });
