
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeSettings {
    headerBg: string;
    headerText: string;
    messageAreaBg: string;
    inputBg: string;
    inputBorder: string;
    inputText: string;
    inputPlaceholder: string;
    sendButtonBg: string;
    sendButtonIcon: string;
}

interface CustomThemeContextType {
    themeSettings: ThemeSettings;
    setThemeSettings: (settings: Partial<ThemeSettings>) => void;
}

const defaultThemeSettings: ThemeSettings = {
    headerBg: '',
    headerText: '',
    messageAreaBg: '',
    inputBg: '',
    inputBorder: '',
    inputText: '',
    inputPlaceholder: 'Ask NexaAI Anything...',
    sendButtonBg: '',
    sendButtonIcon: '',
};

const CustomThemeContext = createContext<CustomThemeContextType>({
    themeSettings: defaultThemeSettings,
    setThemeSettings: () => {},
});

export const useCustomTheme = () => {
    return useContext(CustomThemeContext);
};

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
    const [themeSettings, setThemeSettingsState] = useState<ThemeSettings>(defaultThemeSettings);

    const applyTheme = (settings: ThemeSettings) => {
        const root = document.documentElement;
        if (settings.headerBg) root.style.setProperty('--custom-header-bg', settings.headerBg);
        if (settings.headerText) root.style.setProperty('--custom-header-text', settings.headerText);
        if (settings.messageAreaBg) root.style.setProperty('--custom-message-area-bg', settings.messageAreaBg);
        if (settings.inputBg) root.style.setProperty('--custom-input-bg', settings.inputBg);
        if (settings.inputBorder) root.style.setProperty('--custom-input-border', settings.inputBorder);
        if (settings.inputText) root.style.setProperty('--custom-input-text', settings.inputText);
        if (settings.sendButtonBg) root.style.setProperty('--custom-send-button-bg', settings.sendButtonBg);
        if (settings.sendButtonIcon) root.style.setProperty('--custom-send-button-icon', settings.sendButtonIcon);
    }
    
    const resetTheme = () => {
        const root = document.documentElement;
        root.style.removeProperty('--custom-header-bg');
        root.style.removeProperty('--custom-header-text');
        root.style.removeProperty('--custom-message-area-bg');
        root.style.removeProperty('--custom-input-bg');
        root.style.removeProperty('--custom-input-border');
        root.style.removeProperty('--custom-input-text');
        root.style.removeProperty('--custom-send-button-bg');
        root.style.removeProperty('--custom-send-button-icon');
    }

    const loadAndApplyTheme = () => {
        try {
            const storedTheme = localStorage.getItem('customTheme');
            if (storedTheme) {
                const parsedTheme = JSON.parse(storedTheme);
                setThemeSettingsState(parsedTheme);
                applyTheme(parsedTheme);
            } else {
                setThemeSettingsState(defaultThemeSettings);
                resetTheme();
            }
        } catch (error) {
            console.error("Failed to load or apply custom theme:", error);
            setThemeSettingsState(defaultThemeSettings);
            resetTheme();
        }
    }

    useEffect(() => {
        loadAndApplyTheme();
        
        const handleThemeUpdate = () => {
            loadAndApplyTheme();
        };

        window.addEventListener('theme-updated', handleThemeUpdate);
        
        return () => {
            window.removeEventListener('theme-updated', handleThemeUpdate);
        };
    }, []);

    const setThemeSettings = (settings: Partial<ThemeSettings>) => {
        const newSettings = { ...themeSettings, ...settings };
        localStorage.setItem('customTheme', JSON.stringify(newSettings));
        setThemeSettingsState(newSettings);
        applyTheme(newSettings);
    };

    return (
        <CustomThemeContext.Provider value={{ themeSettings, setThemeSettings }}>
            {children}
        </CustomThemeContext.Provider>
    );
};


export const useThemeContext = () => {
  const context = useContext(CustomThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a CustomThemeProvider');
  }
  return context;
};
