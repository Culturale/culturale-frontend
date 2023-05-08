import { Linking } from 'react-native';

import type { IGeoCode } from '~/domain/entities';
import { Geocode } from '~/domain/entities';

import type { ILocationService } from './location.interface';

export interface IMockLocationService extends ILocationService {
  mockLocation: (location: IGeoCode | null) => void;
  mockGpsState: (enabled: boolean) => void;
}

export class MockLocationService implements IMockLocationService {
  private gpsEnabled = true;
  private location = new Geocode(3, 4);
  private locationUpdatesSubscription: () => void;
  public setupCalled = false;

  async setup() {
    this.setupCalled = true;
  }

  public mockLocation(location: IGeoCode | null): void {
    this.location = location;
    this.locationUpdatesSubscription && this.locationUpdatesSubscription();
  }

  async getLocation(): Promise<IGeoCode | null> {
    return this.location;
  }

  async getSpeed(): Promise<number | null> {
    return 10;
  }

  public getCurrentLocationSubscription() {
    return this.locationUpdatesSubscription;
  }

  unsubscribeFromLocationUpdates() {
    this.locationUpdatesSubscription = null;
  }

  getLastKnownLocation() {
    return this.location;
  }

  isGpsEnabled(): Promise<boolean> {
    return Promise.resolve(this.gpsEnabled);
  }

  mockGpsState(enabled: boolean): void {
    this.gpsEnabled = enabled;
  }

  requestEnableLocationServices(): void {
    Linking.openSettings();
  }
}
