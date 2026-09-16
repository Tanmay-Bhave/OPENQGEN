const API_URL = "http://localhost:5000/api/faculty";

function getHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getFaculties() {
  const response = await fetch(API_URL, {
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch faculty");
  }

  return data.faculties;
}

export async function getFaculty(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch faculty");
  }

  return data.faculty;
}

export async function createFaculty(faculty: {
  name: string;
  facultyId?: string;
  employeeCode?: string;
  email: string;
  password: string;
  department: string;
  designation?: string;
  phone?: string;
}) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(faculty),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create faculty");
  }

  return data.faculty;
}

export async function updateFaculty(
  id: string,
  faculty: {
    name?: string;
    facultyId?: string;
    employeeCode?: string;
    email?: string;
    department?: string;
    designation?: string;
    phone?: string;
  }
) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(faculty),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update faculty");
  }

  return data.faculty;
}

export async function updateFacultyStatus(
  id: string,
  status: "Active" | "Inactive"
) {
  const response = await fetch(`${API_URL}/${id}/status`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update status");
  }

  return data.faculty;
}

export async function updateFacultyPassword(
  id: string,
  password: string
) {
  const response = await fetch(`${API_URL}/${id}/password`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update password");
  }

  return data;
}

export async function deleteFaculty(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete faculty");
  }

  return data;
}