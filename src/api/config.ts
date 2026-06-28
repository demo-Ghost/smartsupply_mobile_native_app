import { Platform } from 'react-native';

/**
 * Base URL for the SmartSupply backend API.
 *
 * The backend serves all routes under an `/api` prefix
 * (e.g. https://smartsupply.gr/api/products), so the base URL includes it.
 *
 * Override at build/run time with the EXPO_PUBLIC_API_URL env var
 * (e.g. in a `.env` file). When running on the Android emulator the
 * host machine's localhost is reachable at 10.0.2.2, so we fall back
 * to a platform-aware default for local development.
 */
function resolveDefaultBaseUrl(): string {
  const port = 3000;
  if (Platform.OS === 'android') {
    return `http://10.0.2.2:${port}/api`;
  }
  // iOS simulator and web can reach the host via localhost.
  return `http://localhost:${port}/api`;
}

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL?.replace(/\/+$/, '') ?? resolveDefaultBaseUrl();
