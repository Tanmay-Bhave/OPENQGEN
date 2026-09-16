import React, { createContext, useContext, useReducer, useCallback } from "react";
import type { User, Page, NavParams, Faculty, QuestionPaper } from "../types";
import { faculties as initialFaculties, questionPapers as initialPapers } from "../data/mock";

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
  | { type: "ADD_FACULTY"; faculty: Faculty }
  | { type: "UPDATE_FACULTY"; faculty: Faculty }
  | { type: "UPDATE_PAPER"; paper: QuestionPaper };

const initialState: AppState = {
  user: null,
  page: "login",
  params: {},
  toasts: [],
  faculties: initialFaculties,
  papers: initialPapers,
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
    case "ADD_FACULTY":
      return { ...state, faculties: [...state.faculties, action.faculty] };
    case "UPDATE_FACULTY":
      return {
        ...state,
        faculties: state.faculties.map((f) => (f.id === action.faculty.id ? action.faculty : f)),
      };
    case "UPDATE_PAPER":
      return {
        ...state,
        papers: state.papers.map((p) => (p.id === action.paper.id ? action.paper : p)),
      };
    default:
      return state;
  }
}

interface AppContextValue extends AppState {
  navigate: (page: Page, params?: NavParams) => void;
  logout: () => void;
  login: (user: User) => void;
  toast: (type: Toast["type"], message: string) => void;
  addFaculty: (faculty: Faculty) => void;
  updateFaculty: (faculty: Faculty) => void;
  updatePaper: (paper: QuestionPaper) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useCallback((page: Page, params?: NavParams) => {
    dispatch({ type: "NAVIGATE", page, params });
  }, []);

  const logout = useCallback(() => dispatch({ type: "LOGOUT" }), []);
  const login = useCallback((user: User) => dispatch({ type: "LOGIN", user }), []);

  const toast = useCallback((type: Toast["type"], message: string) => {
    const id = Math.random().toString(36).slice(2);
    dispatch({ type: "TOAST", toast: { id, type, message } });
    setTimeout(() => dispatch({ type: "REMOVE_TOAST", id }), 4000);
  }, []);

  const addFaculty = useCallback((faculty: Faculty) => dispatch({ type: "ADD_FACULTY", faculty }), []);
  const updateFaculty = useCallback((faculty: Faculty) => dispatch({ type: "UPDATE_FACULTY", faculty }), []);
  const updatePaper = useCallback((paper: QuestionPaper) => dispatch({ type: "UPDATE_PAPER", paper }), []);

  return (
    <AppContext.Provider value={{ ...state, navigate, logout, login, toast, addFaculty, updateFaculty, updatePaper }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
