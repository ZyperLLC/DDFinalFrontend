// useAsyncInitialize.ts - Simplified version
import { useEffect, useState } from 'react';

export function useAsyncInitialize<T>(func: () => Promise<T>, deps: any[] = []) {
  const [state, setState] = useState<T | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If any dependency is false or null, don't execute
    if (deps.some(dep => dep === false || dep === null || dep === undefined)) {
      setState(undefined);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const result = await func();
        if (!cancelled) {
          setState(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, deps);

  return { data: state, loading, error };
}