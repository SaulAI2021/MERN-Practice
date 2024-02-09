import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Navigation from './components/Navigation';
import CreateNote from './components/CreateNotes';
import CreateUser from './components/CreateUser';
import NoteList from './components/NotesList';

export default function App() {
  return (
    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path='/' Component={NoteList}/>
        <Route path='/user' Component={CreateUser}/>
        <Route path='/create' Component={CreateNote}/>
        <Route path='/edit/:id' Component={CreateNote}/>
      </Routes>
    </BrowserRouter>
  )
}