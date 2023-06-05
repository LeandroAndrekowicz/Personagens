import { useState } from "react";
import api from "./service/service";

function App() {

  const [personagem, setPersonagem] = useState();
  const [num, setNum] = useState(0);

  async function geraPersonagem(){
    api.get('/characters/'+num).then((response) =>{
      if(response.data.erro){
        alert('Aconteceu um erro na conexao');
        setPersonagem(null);
      }
      else{
        setPersonagem(response.data);
      }
    }).catch((err) =>{
      setPersonagem(null);
      alert('ERRO '+ err);
    });
  }

  function setaNumero(event){
    if(event > 506){
      return
    }else{
      setNum(Number(event.target.value))
    }
  }
  

  return (
    <>
    <h1 className="text-2xl font-extralight text-center bg-sky-200">Digite um numero e descubra qual personagem você é...</h1>
    <div className="flex h-screen justify-center items-center bg-sky-200 content-center">
      <div className="text-center h-auto w-auto bg-sky-400 rounded-s-full">
        <div>
          <input
            className="w-40 rounded-lg mt-10"
            type="number"
            id="numero"
            value={num}
            onChange={setaNumero}>
          </input>
          <br></br>
          <input
            type="button"
            className="bg-black text-slate-50 w-32 h-10 mt-10 rounded-full"
            onClick={geraPersonagem}>
          </input>
        </div>

        {personagem && <>
            <img src={personagem.image} className="rounded-full ml-40" alt="Foto do Personagem" />
          </>}
      </div>
      <div>
        {personagem && <>
        <p className="flex flex-wrap text-zinc-900 text-xl">Nome: {personagem.name}</p>
        <p className="flex flex-wrap text-zinc-900 text-xl" >Ocupação: {personagem.occupation}</p>
        </>}
      </div>
    </div>
    </>
  );
}

export default App;
