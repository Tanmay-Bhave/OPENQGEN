import { request, toId } from "./client";

export type SubjectPayload = { name: string; courseCode: string; department: string; semester: string; credits: number; subjectType: string; academicYear?: string; assignedFaculty?: string | null };
export const getSubjects = async () => (await request<{ subjects: any[] }>("/subjects")).subjects.map(toId);
export const getSubject = async (id: string) => toId(await request<any>(`/subjects/${id}`));
export const createSubject = async (body: SubjectPayload) => toId((await request<{ subject: any }>("/subjects", { method: "POST", body: JSON.stringify(body) })).subject);
export const updateSubject = async (id: string, body: Partial<SubjectPayload>) => toId((await request<{ subject: any }>(`/subjects/${id}`, { method: "PUT", body: JSON.stringify(body) })).subject);
export const updateSubjectStatus = async (id: string, status: "Active" | "Inactive") => toId((await request<{ subject: any }>(`/subjects/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) })).subject);
export const assignFaculty = async (id: string, assignedFaculty: string | null) => toId((await request<{ subject: any }>(`/subjects/${id}`, { method: "PUT", body: JSON.stringify({ assignedFaculty }) })).subject);
export const deleteSubject = (id: string) => request<{ message: string }>(`/subjects/${id}`, { method: "DELETE" });
