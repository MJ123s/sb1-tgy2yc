import React from 'react';
import { TopicProvider } from './context/TopicContext';
import { Layout } from './components/Layout';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';

function App() {
  return (
    <TopicProvider>
      <Layout>
        <div className="flex gap-6 w-full">
          <Sidebar />
          <MainContent />
        </div>
      </Layout>
    </TopicProvider>
  );
}

export default App;