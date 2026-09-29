import React, { createContext, useContext, useReducer, useCallback, useEffect } from "react";
import type { User, Page, NavParams, Faculty, QuestionPaper } from "../types";
import { getFaculties } from "../Api/facultyApi";

interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
}

interface AppState {
  user: User | null;
  page: Page;
  params: NavParams;
  toasts: Toast[];
  faculties: Faculty[];
  papers: QuestionPaper[];
}

type Action =
  | { type: "LOGIN"; user: User }
  | { type: "LOGOUT" }
  | { type: "NAVIGATE"; page: Page; params?: NavParams }
  | { type: "TOAST"; toast: Toast }
  | { type: "REMOVE_TOAST"; id: string }
  | { type: "SET_FACULTIES"; faculties: Faculty[] };

function storedUser(): User | null {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) as User : null;
  } catch {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return null;
  }
}

const persistedUser = storedUser();
const initialState: AppState = {
  user: persistedUser,
  page: persistedUser ? (persistedUser.role === "admin" ? "admin/dashboard" : "faculty/dashboard") : "login",
  params: {},
  toasts: [],
  faculties: [],
  papers: [],
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.user };
    case "LOGOUT":
      return { ...state, user: null, page: "login", params: {} };
    case "NAVIGATE":
      return { ...state, page: action.page, params: action.params ?? {} };
    case "TOAST":
      return { ...state, toasts: [...state.toasts, action.toast] };
    case "REMOVE_TOAST":
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.id) };
    case "SET_FACULTIES":
      return { ...state, faculties: action.faculties };
    default:
      return state;
  }
}

interface AppContextValue extends AppState {
  navigate: (page: Page, params?: NavParams) => void;
  logout: () => void;
  login: (user: User) => void;
  toast: (type: Toast["type"], message: string) => void;
  refreshFaculties: () => Promise<void>;
  updatePaper: (paper: QuestionPaper) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const refreshFaculties = useCallback(async () => {
    if (state.user?.role !== "admin") return;
    try {
      const data = await getFaculties();
      dispatch({ type: "SET_FACULTIES", faculties: data.map((f: any) => ({ ...f, id: f.id || f._id, assignedSubjects: [], password: "", lastLogin: f.lastLogin ? new Date(f.lastLogin).toLocaleString() : "Never", createdDate: f.createdAt ? new Date(f.createdAt).toLocaleDateString() : "" })) });
    } catch { /* individual pages show request errors for their own resources */ }
  }, [state.user?.role]);
  useEffect(() => { refreshFaculties(); }, [refreshFaculties]);

  const navigate = useCallback((page: Page, params?: NavParams) => {
    dispatch({ type: "NAVIGATE", page, params });
  }, []);

  const logout = useCallback(() => { localStorage.removeItem("token"); localStorage.removeItem("user"); dispatch({ type: "LOGOUT" }); }, []);
  const login = useCallback((user: User) => { localStorage.setItem("user", JSON.stringify(user)); dispatch({ type: "LOGIN", user }); }, []);

  const toast = useCallback((type: Toast["type"], message: string) => {
    const id = Math.random().toString(36).slice(2);
    dispatch({ type: "TOAST", toast: { id, type, message } });
    setTimeout(() => dispatch({ type: "REMOVE_TOAST", id }), 4000);
  }, []);
  const updatePaper = useCallback((_paper: QuestionPaper) => {
    dispatch({ type: "TOAST", toast: { id: "paper-api-required", type: "error", message: "Question-paper storage is not available on the backend." } });
  }, []);


  return (
    <AppContext.Provider value={{ ...state, navigate, logout, login, toast, refreshFaculties, updatePaper }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
