import { createContext, Dispatch, SetStateAction } from "react";

type UserContextType = {
    user: string;
    setUser: Dispatch<SetStateAction<string>>;
};

export const UserContext = createContext<UserContextType>({
    user: "",
    setUser: () => {}
});