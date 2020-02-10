import { useState, useEffect } from 'react';

import { requestAPI } from 'utils/api';

export interface IOptions {
  url: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  params: any;
}

interface IData {
  data: any;
  status: number;
}

export default function useFetch(options: IOptions) {
  const [data, setData] = useState<IData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const process = async () => {
    setLoading(true);

    requestAPI(options)
      .then(data => {
        setData(data);
        setError(null);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    options && process();

    // eslint-disable-next-line
  }, [options]);

  return [data, error, loading];
}
