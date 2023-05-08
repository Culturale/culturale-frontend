import { Linking } from 'react-native';
import type {
  ConfigureOptions,
  RequestPermissionOptions,
  Location,
  Subscription,
} from 'react-native-location';
import RNLocation from 'react-native-location';

import type { IGeoCode } from '~/domain/entities';
import { Geocode } from '~/domain/entities';

import type { ILocationService } from './location.interface';

export const LocationOptions: ConfigureOptions = {
  desiredAccuracy: {
    android: 'highAccuracy',
    ios: 'best',
  },
  interval: 10000,
  maxWaitTime: 2000,
};

export const PERMISSIONS_OPTIONS: RequestPermissionOptions = {
  android: {
    detail: 'fine',
  },
  ios: 'always',
};

export class LocationService implements ILocationService {
  private locationUpdatesSubscription: Subscription = null;
  private lastKnownLocation: Geocode = null;

  constructor(private options: ConfigureOptions = {}) {}
  isGpsEnabled(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async setup() {
    // Need this try catch to prevent the app from freezing when gps is denied on android
    try {
      await RNLocation.configure(this.options);
    } catch (error) {
      return null;
    }
    this.subscribeToLocationUpdates();
  }

  private async getLatestLocation(): Promise<Location | null> {
    const hasPermission = await RNLocation.checkPermission(PERMISSIONS_OPTIONS);
    if (!hasPermission) {
      return null;
    }
    return await RNLocation.getLatestLocation();
  }

  async getLocation(): Promise<IGeoCode | null> {
    const location = await this.getLatestLocation();
    return location
      ? new Geocode(location.longitude, location.latitude)
      : this.lastKnownLocation;
  }

  async getSpeed(): Promise<number | null> {
    const location = await this.getLatestLocation();
    return location ? location.speed : null;
  }

  public getCurrentLocationSubscription(): Subscription {
    return this.locationUpdatesSubscription;
  }

  public subscribeToLocationUpdates(): void {
    if (!this.locationUpdatesSubscription) {
      this.locationUpdatesSubscription = RNLocation.subscribeToLocationUpdates(
        (locations: Location[]) => {
          if (locations.length > 0) {
            this.lastKnownLocation = new Geocode(
              locations[0].latitude,
              locations[0].longitude
            );
          }
        }
      );
    }
  }

  public unsubscribeFromLocationUpdates(): void {
    this.locationUpdatesSubscription && this.locationUpdatesSubscription();
  }

  public getLastKnownLocation(): IGeoCode {
    return this.lastKnownLocation;
  }

  requestEnableLocationServices(): void {
    Linking.openSettings();
  }
}
