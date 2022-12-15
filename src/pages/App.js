import gitLogo from '../assets/img/github.png'

import { Container } from './styles';
import Input from '../components//Input';
import ItemRepo from '../components/ItemRepo';
import Button from '../components/Button';
import { useState } from 'react';
import { api } from '../services/api';


function App() {

  const [currentRepo, setCurrentRepo] = useState('')
  const [repos, setRepos] = useState([]);

  const handleSerchRepo = async () => { //funcao assincrona
    const {data} = await api.get(`repos/${currentRepo}`) //funcao assincrona precisa de await para esperar resposta
    if(data.id) {
      const isExist = repos.find(repo => repo.id === data.id)

      if (!isExist){
        setRepos(prev => [...prev, data])
        setCurrentRepo('')
        return
      }
    }

    alert('Repositório não encontrado.')
  }

  //funcao para remover aqui - usar id 
  const handleRemoveRepo = (id) => {
    //utiliza filter
  }

  return (
    <Container>
        <img src={gitLogo} width={72} height={72} alt='Logo GitHub'></img>
    <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}></Input>
    <Button onClick = {handleSerchRepo}></Button>
    {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo}></ItemRepo>)}
    </Container>
  );
}

export default App;
