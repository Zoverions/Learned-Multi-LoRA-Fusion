
import React, { ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  id: string;
  children: ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({ title, id, children }) => {
  return (
    <section id={id} className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
        {title}
      </h2>
      {children}
    </section>
  );
};
