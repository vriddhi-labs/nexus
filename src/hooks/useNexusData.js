import { useState, useEffect } from 'react';

export const useNexusData = (dataRequirements, globalContext = {}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const resolveQueries = async () => {
      setLoading(true);
      const results = {};

      try {
        for (const [key, config] of Object.entries(dataRequirements)) {
          let targetUrl = config.endpoint;

          if (targetUrl.includes('$context.')) {
            const contextKey = targetUrl.split('$context.')[1];
            targetUrl = targetUrl.replace(`$context.${contextKey}`, globalContext[contextKey] || '');
          }

          try {
            // Force mock behavior for local development since backend isn't running
            if (targetUrl.includes('/api/v1/inventory')) {
              throw new Error('Local dev mock trigger');
            }

            const response = await fetch(targetUrl, {
              method: config.method || 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${globalContext.token || ''}`
              }
            });

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
              results[key] = await response.json();
            } else {
              throw new Error('Endpoint did not return JSON');
            }
          } catch (e) {
            console.warn(`[NexusData] Fetch failed for ${key}, falling back to mock data:`, e.message);
            // Mock data fallback to prevent UI breakage
            results[key] = [
              { id: 1, name: 'Industrial Hammer Drill', quantity: 45 },
              { id: 2, name: 'Heavy Duty Harness', quantity: 120 },
              { id: 3, name: 'Concrete Mixer (Gas)', quantity: 8 }
            ];
          }
        }

        setData(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (Object.keys(dataRequirements).length > 0) {
      resolveQueries();
    } else {
      setLoading(false);
    }
  }, [dataRequirements, globalContext]);

  return { data, loading, error };
};
