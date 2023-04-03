import { createContext, useContext } from 'react';

import type { IApplication } from '~/application';

const ApplicationContext = createContext<IApplication>({} as IApplication);

export const ApplicationLayerProvider = ApplicationContext.Provider;

export const useApplicationLayer = () => useContext(ApplicationContext);
