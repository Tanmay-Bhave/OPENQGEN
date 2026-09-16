import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  width?: string;
  footer?: React.ReactNode;
}

export default function Modal({ open, onClose, title, subtitle, children, width = "max-w-lg", footer }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-box ${width} slide-in mx-4`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-6 border-b border-slate-100">
          <div>
            <h2 className="font-display text-lg font-700 text-slate-900">{title}</h2>
            {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors ml-4 flex-shrink-0"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
        {footer && <div className="px-6 pb-6 pt-0 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
}

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  confirmClass?: string;
  inputLabel?: string;
  inputValue?: string;
  onInputChange?: (v: string) => void;
}

export function ConfirmDialog({
  open, onClose, onConfirm, title, message,
  confirmLabel = "Confirm", confirmClass = "btn-danger",
  inputLabel, inputValue, onInputChange,
}: ConfirmDialogProps) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box max-w-md mx-4 slide-in" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <h3 className="font-display text-lg font-600 text-slate-900 mb-2">{title}</h3>
          <p className="text-sm text-slate-500 mb-4">{message}</p>
          {inputLabel && onInputChange && (
            <div className="mb-4">
              <label className="form-label">{inputLabel}</label>
              <textarea
                className="form-input resize-none"
                rows={3}
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder="Enter reason..."
              />
            </div>
          )}
          <div className="flex justify-end gap-3">
            <button className="btn-secondary" onClick={onClose}>Cancel</button>
            <button className={confirmClass} onClick={() => { onConfirm(); onClose(); }}>{confirmLabel}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
