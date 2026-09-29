import { request, toId } from "./client";

export async function getFaculties() {
  return (await request<{ faculty: any[] }>("/faculty")).faculty.map(toId);
}
export async function getFaculty(id: string) { return toId(await request<any>(`/faculty/${id}`)); }
export async function createFaculty(faculty: { name: string; facultyId?: string; employeeCode?: string; email: string; password: string; department: string; designation?: string; phone?: string }) {
  return toId((await request<{ faculty: any }>("/faculty", { method: "POST", body: JSON.stringify(faculty) })).faculty);
}
export async function updateFaculty(id: string, faculty: { name?: string; facultyId?: string; employeeCode?: string; email?: string; department?: string; designation?: string; phone?: string }) {
  return toId((await request<{ faculty: any }>(`/faculty/${id}`, { method: "PUT", body: JSON.stringify(faculty) })).faculty);
}
export async function updateFacultyStatus(id: string, status: "Active" | "Inactive") {
  return toId((await request<{ faculty: any }>(`/faculty/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) })).faculty);
}
export const updateFacultyPassword = (id: string, password: string) => request<{ message: string }>(`/faculty/${id}/password`, { method: "PATCH", body: JSON.stringify({ password }) });
export const deleteFaculty = (id: string) => request<{ message: string }>(`/faculty/${id}`, { method: "DELETE" });
