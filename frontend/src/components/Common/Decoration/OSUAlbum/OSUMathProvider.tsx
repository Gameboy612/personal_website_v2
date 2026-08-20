import { createContext } from "react";

export interface OSUCardData {
    title: string;
    description: string;
    date: string;
    logoImage?: string;
    images?: string[];
    content?: string;
    href?: string;
    hrefText?: string;
}   

export interface OSUMathContextType {
    r: number;
    C_x: number;
    C_y: number;
    scaleFactor: number;
    numRenderedCards: number;
    cards: OSUCardData[];
    scrollSpeed: number;
    currentWorldTheta: number;
    selectedIndex: number;
}

export const OSUMathProvider = createContext<OSUMathContextType>({
    r: 0,
    C_x: 0,
    C_y: 0,
    scaleFactor: 1,
    numRenderedCards: 0,
    cards: [],
    scrollSpeed: 0,
    currentWorldTheta: 0,
    selectedIndex: 0
});