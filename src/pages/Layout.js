import React from 'react';
import Layout from '@theme/Layout';
import Chatbot from '@site/src/components/Chatbot/Chatbot';

export default function Root({children}) {
  return (
    <Layout>
      <div style={{ position: 'relative' }}>
        {children}
        <Chatbot initialOpen={false} />
      </div>
    </Layout>
  );
}