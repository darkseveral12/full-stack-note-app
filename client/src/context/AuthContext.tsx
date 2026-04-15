import { createContext } from "react";
import type { User } from "../types/User";

interface AuthContextType {
  user: User | null;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>;
}

const authContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export default authContext;
