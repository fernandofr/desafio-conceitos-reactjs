import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositorys, setRepositorys] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositorys(response.data)
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositorio - ${Date.now()}`
    });
    
    setRepositorys([...repositorys, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositorys(repository => repository.filter(item => item.id !== id))   
  }

  return (
    <div>
      <ul data-testid="repository-list">        
        {repositorys.map(repository => 
          <li key={repository.id}>{repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
