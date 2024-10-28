import React, { createContext, useContext, useState } from 'react';

type Topic = 'geometry' | 'algebra' | 'calculus' | 'trigonometry';

interface TopicContextType {
  currentTopic: Topic;
  setCurrentTopic: (topic: Topic) => void;
}

const TopicContext = createContext<TopicContextType | undefined>(undefined);

export function TopicProvider({ children }: { children: React.ReactNode }) {
  const [currentTopic, setCurrentTopic] = useState<Topic>('geometry');

  return (
    <TopicContext.Provider value={{ currentTopic, setCurrentTopic }}>
      {children}
    </TopicContext.Provider>
  );
}

export function useTopic() {
  const context = useContext(TopicContext);
  if (context === undefined) {
    throw new Error('useTopic must be used within a TopicProvider');
  }
  return context;
}