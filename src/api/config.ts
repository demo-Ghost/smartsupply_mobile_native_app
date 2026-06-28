import { Platform } from 'react-native';

/**
 * Base URL for the SmartSupply backend API.
 *
 * Override at build/run time with the EXPO_PUBLIC_API_URL env var
 * (e.g. in a `.env` file). When running on the Android emulator the
 * host machine's localhost is reachable at 10.0.2.2, so we fall back
 * to a platform-aware default for local development.
 */
function resolveDefaultBaseUrl(): string {
  const port = 3000;
  if (Platform.OS === 'android') {
    return `http://10.0.2.2:${port}`;
  }
  // iOS simulator and web can reach the host via localhost.
  return `http://localhost:${port}`;
}

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL?.replace(/\/+$/, '') ?? resolveDefaultBaseUrl();
