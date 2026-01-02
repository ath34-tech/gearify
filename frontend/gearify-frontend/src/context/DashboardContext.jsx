import { createContext, useContext, useEffect, useState } from "react";
import { fetchDashboardRequests } from "../api/maintenance";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const data = await fetchDashboardRequests();
      setRequests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        requests,
        loading,
        refresh: loadDashboardData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}
