import React from 'react';

export function Card({ children }) {
  return <div className="bg-white rounded-lg shadow p-6 mb-4">{children}</div>;
}
export function CardHeader({ children }) {
  return <div className="mb-2">{children}</div>;
}
export function CardTitle({ children }) {
  return <h2 className="text-xl font-bold text-primary">{children}</h2>;
}
export function CardDescription({ children }) {
  return <p className="text-gray-600">{children}</p>;
}
export function CardContent({ children }) {
  return <div className="mt-2">{children}</div>;
}