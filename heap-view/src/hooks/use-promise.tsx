import { useState, useEffect } from "react";

export default function usePromise(promiseCreater: any, deps: any) {
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const process = async () => {
    setLoading(true);

    try {
      const result = await promiseCreater();

      setResolved(result);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    process();

    // eslint-disable-next-line
  }, deps);

  return [resolved, error, loading];
}
