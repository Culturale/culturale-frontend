import type { Geocode, IGeoCode } from '~/domain/entities';
export interface ILocationService {
  /**
   * Setup location on load
   */
  setup(): Promise<void>;

  /**
   * Return current driver location
   */
  getLocation(): Promise<Geocode | null>;

  /**
   * Get driver current speed
   */
  getSpeed(): Promise<number | null>;

  /**
   * Get current location subscription
   */
  getCurrentLocationSubscription(): () => void;

  /**
   * Subscribe to location updates
   */
  subscribeToLocationUpdates(): void;

  /**
   * Unsubscribe to location updates
   */
  unsubscribeFromLocationUpdates(): void;

  /**
   * Returns if GPS is enabled or not
   */
  isGpsEnabled(): Promise<boolean>;

  /**
   * Request enable location services
   */
  requestEnableLocationServices(): void;

  /**
   * Get driver's last know location
   */
  getLastKnownLocation(): IGeoCode;
}
