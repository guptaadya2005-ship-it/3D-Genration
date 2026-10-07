"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  onError?: (message: string) => void;
}

interface State {
  message: string | null;
}

export class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { message: null };

  static getDerivedStateFromError(error: Error): State {
    return { message: error.message || "The 3D viewport failed to start." };
  }

  componentDidCatch(error: Error) {
    this.props.onError?.(error.message);
  }

  render() {
    if (this.state.message) {
      return (
        <div className="flex h-full items-center justify-center bg-[var(--editor-viewport)] p-6 text-center">
          <div className="max-w-md rounded-lg border border-red-500/40 bg-red-500/10 p-4">
            <p className="text-sm font-semibold text-red-300">Viewport error</p>
            <p className="mt-2 text-xs leading-5 text-[var(--editor-muted)]">
              {this.state.message}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
