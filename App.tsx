import * as React from 'react';
import { Text, View } from 'react-native';
import { RootNavigator } from './app/navigation';
import { Application } from './app/application/application';
import { IApplication } from './app/application/application.interface';

export default function App() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [applicationLayer, setApplicationLayer] = React.useState<
    IApplication | undefined
  >(undefined);

  React.useEffect(() => {
    (async () => {
      if (!applicationLayer) {
        const app = new Application();
        await app.setup();
        setApplicationLayer(app);
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return <RootNavigator />;
}
