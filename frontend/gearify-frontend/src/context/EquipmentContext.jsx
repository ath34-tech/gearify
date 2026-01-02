import { createContext, useContext, useEffect, useState } from "react";
import { getEquipment } from "../api/equipment.api";

const EquipmentContext = createContext();

export function EquipmentProvider({ children }) {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEquipment()
      .then(setEquipment)
      .finally(() => setLoading(false));
  }, []);

  return (
    <EquipmentContext.Provider value={{ equipment, loading }}>
      {children}
    </EquipmentContext.Provider>
  );
}

export function useEquipment() {
  return useContext(EquipmentContext);
}
