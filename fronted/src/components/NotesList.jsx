import {useEffect, useState } from 'react';
import axios from 'axios';
import {format} from 'timeago.js'

export default function NoteList(){
  const [notas, setNotas] = useState();
   async function CallNotas(){
      const {data} = await axios.get("http://localhost:3000/api/notes");
      setNotas(data);
      console.log(data);
   }
  useEffect(()=>{
    CallNotas();
  },[]);

  async function BorrarNota(id){
    await axios.delete('http://localhost:3000/api/notes/'+id);
    CallNotas();
  }
  return (
    <div>
      {
        notas?.map((nota)=>
            (
              <div key={nota._id}>
                <div>
                  <div>{nota.author}</div>
                  <div>{nota.title}</div>
                  <div>{nota.content}</div>
                  <div>{format(nota.date)}</div>
                </div>
                <div>
                  <button onClick={()=> BorrarNota(nota._id)}>Borrar</button>
                </div>
              </div>
            )
        )
      }
    </div>
  )
}