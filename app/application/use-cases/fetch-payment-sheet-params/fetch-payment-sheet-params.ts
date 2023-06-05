import { IInfrastructure } from '~/infrastructure';

export type FetchPaymentSheetParams = {
  args: [eventId: string];
  responseType: Promise<any>;
};

export async function fetchPaymentSheetParams(
  infrastructure: IInfrastructure,
  ...args: FetchPaymentSheetParams['args']
): FetchPaymentSheetParams['responseType'] {
  const [eventId] = args;
  return await infrastructure.api.fetchPaymentSheetParams(eventId);
}
