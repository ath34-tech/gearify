import { createContext, useContext, useEffect, useState } from "react";
import { getTeams } from "../api/teams.api";

const TeamsContext = createContext();

export function TeamsProvider({ children }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeams()
      .then(setTeams)
      .finally(() => setLoading(false));
  }, []);

  return (
    <TeamsContext.Provider value={{ teams, loading }}>
      {children}
    </TeamsContext.Provider>
  );
}

export function useTeams() {
  return useContext(TeamsContext);
}
