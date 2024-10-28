import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">כלים ייעודיים לנושאי הלימוד - 5 יח"ל</h1>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}