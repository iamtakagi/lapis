import { useState, useEffect, useCallback } from 'react';

interface Hooks {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const useSearchForm = (location: string = window.location.href): Hooks => {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const url = new URL(location);
    const q = url.searchParams.get('q');
    if (q) {
      setSearchText(q);
    }
  }, [location]);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const url = new URL(location);
      url.pathname = '/search';
      url.searchParams.set('q', searchText);
      window.location.href = url.href;
    },
    [location, searchText],
  );

  return {
    searchText,
    setSearchText,
    onSubmit,
  };
};
