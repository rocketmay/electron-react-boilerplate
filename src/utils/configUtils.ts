// load information from save file
export const getConfig = () => {
    const savedConfig = localStorage.getItem('appConfig');
    return savedConfig ? JSON.parse(savedConfig) : [];
  };