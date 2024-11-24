import React, { createContext, useState } from "react";

export const ShowModalContext = createContext();

export const ShowModalProvider = ({ children }) => {
    const [show, setShow] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const refreshPostings = () => {
      setRefreshTrigger((prev) => !prev);
    };

    return (
        <ShowModalContext.Provider value={{ show, setShow, refreshTrigger, refreshPostings }}>
          {children}
        </ShowModalContext.Provider>
      );
}
