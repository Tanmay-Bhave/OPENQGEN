interface BadgeProps {
  variant: "success" | "error" | "warning" | "info" | "default" | "purple";
  children: React.ReactNode;
  size?: "sm" | "md";
}

const variants = {
  success: "bg-green-50 text-green-700 ring-1 ring-green-200",
  error: "bg-red-50 text-red-700 ring-1 ring-red-200",
  warning: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  info: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  default: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
  purple: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200",
};

export default function Badge({ variant, children, size = "md" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-0.5 text-xs"
      }`}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, BadgeProps["variant"]> = {
    Active: "success",
    Inactive: "error",
    "Under Review": "warning",
    Approved: "success",
    Rejected: "error",
    Draft: "default",
    Finalized: "purple",
  };
  return <Badge variant={map[status] ?? "default"}>{status}</Badge>;
}
