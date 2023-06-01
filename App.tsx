import * as React from 'react';

import { Application } from './app/application/application';
import type { IApplication } from './app/application/application.interface';
import { ApplicationLayerProvider } from './app/hooks/use-application-layer';
import { RootNavigator } from './app/navigation';
import { StripeProvider } from '@stripe/stripe-react-native';

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
      <StripeProvider
        publishableKey="pk_test_51NATp9IdIcZ9qhZBJTgkQxqerAysKhRFXH4B7FYG0P5zW6SaBgCVXRiALMs5i9ZGeYV0WxZlFoSFGSdbC7lUwzOy00AHnoBtlG"
        merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}"
      >
        <RootNavigator />
      </StripeProvider>
    </ApplicationLayerProvider>
  );
}
