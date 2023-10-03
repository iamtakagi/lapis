import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

interface Hooks {
  searchText: string;
  inputRef: React.RefObject<HTMLInputElement>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const useSearchForm = (): Hooks => {
  const [searchText, setSearchText] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const window = useMemo(() => global.window, [global, global.window]);
  const location = useMemo(() => window.location, [window, window.location]);
  const url = useMemo(() => new URL(location.href), [location, location.href]);

  useEffect(() => {
    const q = url.searchParams.get('q');
    if (q) {
      setSearchText(q);
    }
  }, [url]);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!searchText.length) {
        inputRef.current?.focus();
        return;
      }
      url.pathname = '/search';
      url.searchParams.set('q', searchText);
      location.href = url.href;
    },
    [location, url, searchText],
  );

  return {
    searchText,
    inputRef,
    setSearchText,
    onSubmit,
  };
};
