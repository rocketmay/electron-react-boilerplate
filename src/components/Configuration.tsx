import React, { useState, useEffect } from 'react';
import './Configuration.css';

interface ConfigItem {
  key: string;
  value: string;
  isEditing: boolean;
  isConstant?: boolean;
}

// SVG icons as components
const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  );
  
  const SaveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
  );
  
  const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  );

  const AddIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );

const CONSTANT_KEYS = ['Testnet Private Key', 'Testnet Private Account Id'];

const Configuration = () => {
  const [config, setConfig] = useState<ConfigItem[]>([]);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const savedConfig = localStorage.getItem('appConfig');
      let loadedConfig: ConfigItem[] = savedConfig ? JSON.parse(savedConfig) : [];
      
      // Ensure constant keys exist and are at the top
      CONSTANT_KEYS.forEach(key => {
        const existingItem = loadedConfig.find(item => item.key === key);
        if (existingItem) {
          loadedConfig = loadedConfig.filter(item => item.key !== key);
          loadedConfig.unshift(existingItem);
        } else {
          loadedConfig.unshift({ key, value: '', isEditing: false, isConstant: true });
        }
      });

      setConfig(loadedConfig.map(item => ({
        ...item,
        isEditing: false,
        isConstant: CONSTANT_KEYS.includes(item.key)
      })));
    } catch (error) {
      console.error('Failed to load configuration:', error);
    }
  };

  const saveConfig = async (newConfig: ConfigItem[]) => {
    try {
      const configToSave = newConfig.map(({ key, value }) => ({ key, value }));
      localStorage.setItem('appConfig', JSON.stringify(configToSave));
    } catch (error) {
      console.error('Failed to save configuration:', error);
    }
  };

  const addItem = () => {
    if (newKey && newValue && !CONSTANT_KEYS.includes(newKey)) {
      const newConfig = [...config, { key: newKey, value: newValue, isEditing: false }];
      setConfig(newConfig);
      saveConfig(newConfig);
      setNewKey('');
      setNewValue('');
    }
  };

  const toggleEdit = (index: number) => {
    const newConfig = [...config];
    newConfig[index].isEditing = !newConfig[index].isEditing;
    setConfig(newConfig);
    if (!newConfig[index].isEditing) {
      saveConfig(newConfig);
    }
  };

  const updateItem = (index: number, key: string, value: string) => {
    const newConfig = [...config];
    newConfig[index] = { ...newConfig[index], key: newConfig[index].isConstant ? newConfig[index].key : key, value };
    setConfig(newConfig);
  };

  const deleteItem = (index: number) => {
    if (!config[index].isConstant) {
      const newConfig = config.filter((_, i) => i !== index);
      setConfig(newConfig);
      saveConfig(newConfig);
    }
  };

  return (
    <div className="configuration page-content">
      <h1>Configuration</h1>
      <div className="config-table">
        <div className="config-header">
          <span>Key</span>
          <span>Value</span>
          <span>Actions</span>
        </div>
        <ul className="config-list">
          {config.map((item, index) => (
            <li key={index} className="config-item">
              <input
                type="text"
                value={item.key}
                onChange={(e) => updateItem(index, e.target.value, item.value)}
                readOnly={item.isConstant || !item.isEditing}
                className={`config-key ${item.isConstant ? 'constant-key' : ''} ${(!item.isConstant && item.isEditing) ? 'editable' : ''}`}
              />
              <input
                type="text"
                value={item.value}
                onChange={(e) => updateItem(index, item.key, e.target.value)}
                readOnly={!item.isEditing}
                className={`config-value ${item.isEditing ? 'editable' : ''}`}
              />
              <div className="config-actions">
                <button onClick={() => toggleEdit(index)} className="icon-button">
                  {item.isEditing ? <SaveIcon /> : <EditIcon />}
                </button>
                {!item.isConstant && (
                  <button onClick={() => deleteItem(index)} className="icon-button">
                    <DeleteIcon />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="config-add-item">
        <input
          type="text"
          placeholder="Key"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="Value"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button onClick={addItem} className="icon-button">
          <AddIcon />
        </button>
      </div>
    </div>
  );
};

export default Configuration;