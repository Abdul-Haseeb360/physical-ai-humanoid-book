import React, { useEffect } from 'react';
import OriginalLayout from '@theme-original/Layout';
import Chatbot from '@site/src/components/Chatbot/Chatbot';

export default function Layout(props) {
  const [isClient, setIsClient] = React.useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <OriginalLayout {...props}>
        {props.children}
      </OriginalLayout>
      {isClient && <Chatbot initialOpen={false} />}
    </>
  );
}