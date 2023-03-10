import { useState } from 'react';
import './home.css';

import { Link, useNavigate } from 'react-router-dom';

import { auth } from '../../firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Home(){
    const [email, setEmail] = useState('');
    const [passwrod, setPassword] = useState('');
    
    const navigate = useNavigate();

    async function handleLogin(e){
      e.preventDefault();
      
      if(email !== '' && passwrod !== ''){
        
        await signInWithEmailAndPassword(auth, email, passwrod)
        .then(() => {
          navigate('/admin', { replace: true })
        })
        .catch(() => {
          console.log("Erro ao fazer login")
        })

      }else{
        alert("Preencha todos os campos!")
      }
    }
    
    return(
      <div className='home-container'>
        <h1>Lista de tarefas</h1>
        <span>Gerencie sua agenda de forma fácil.</span>

        <form className='form' onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Digite o seu e-mail..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="********"
            value={passwrod}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Acessar</button>
        </form>

        <Link className="button-link" to="/register">
          Não possui uma conta? Cadastre-se 
        </Link>
      </div>
    )
  }