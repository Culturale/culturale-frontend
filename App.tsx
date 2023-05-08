import * as React from 'react';

import { Application } from './app/application/application';
import type { IApplication } from './app/application/application.interface';
import { ApplicationLayerProvider } from './app/hooks/use-application-layer';
import { RootNavigator } from './app/navigation';

export default function App() {
  const [applicationLayer, setApplicationLayer] = React.useState<
    IApplication | undefined
  >(undefined);

  React.useEffect(() => {
    (async () => {
      if (!applicationLayer) {
        const app = new Application();
        await app.setup();
        setApplicationLayer(app);
      }
    })();
  }, []);

  if (!applicationLayer) return null;

  return (
    <ApplicationLayerProvider value={applicationLayer}>
      <RootNavigator />
    </ApplicationLayerProvider>
  );
}
