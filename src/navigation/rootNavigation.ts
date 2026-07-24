import { createNavigationContainerRef } from '@react-navigation/native';
import type { RootStackParamList } from './types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

/** Navigate to a root-stack screen from nested tab screens. */
export function navigateToRootScreen<Name extends keyof RootStackParamList>(
  name: Name,
  params: RootStackParamList[Name],
) {
  if (!navigationRef.isReady()) {
    return;
  }

  // Typed navigate overloads are awkward with generic Name; params are validated by the call site.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (navigationRef.navigate as any)(name, params);
}
