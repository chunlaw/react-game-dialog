import React, { ReactNode, useCallback, useEffect, useState } from "react";

interface AppContextState {
  content: string;
  open: boolean;
}

interface AppContextValue extends AppContextState {
  openDialog: () => void;
  closeDialog: () => void;
  setContent: (v: string) => void;
}

const AppContext = React.createContext({} as AppContextValue);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppContextState>(DEFAULT_STATE);

  const openDialog = useCallback(() => {
    setState(prev => ({...prev, open: true}))
  }, [])

  const closeDialog = useCallback(() => {
    setState(prev => ({...prev, open: false}))
  }, [])

  const setContent = useCallback((content: string) => {
    setState(prev => ({
      ...prev,
      content
    }))
  }, [])

  useEffect(() => {
    if ( !DEFAULT_STATE.content ) {
      fetch('/example.md')
        .then(r => r.text())
        .then(r => setContent(r))
    }
  }, [setContent])

  useEffect(() => {
    localStorage.setItem('content', state.content)
  }, [state.content])

  return (
    <AppContext.Provider
      value={{
        ...state,
        openDialog,
        closeDialog,
        setContent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

const DEFAULT_STATE: AppContextState = {
  content: localStorage.getItem("content") ?? "",
  open: false,
};