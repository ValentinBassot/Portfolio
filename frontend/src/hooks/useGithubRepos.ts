"use client";

import { useEffect, useState } from 'react';

type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
};

type Grouped = {
  epitech: GitHubRepo[];
  poc: GitHubRepo[];
  others: GitHubRepo[];
};

export const useGithubRepos = () => {
  const [data, setData] = useState<Grouped | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      try {
        const base = process.env.NEXT_PUBLIC_API_URL ;
        const res = await fetch(`${base}/github/repos`);
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        setData(json);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error';
        console.error(err);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return { data, loading, error } as const;
};

export default useGithubRepos;
