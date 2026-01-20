import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'

import Header from './components/Header'
import PokemonList from './pages/PokemonList'
import PokemonForm from './pages/PokemonForm'
import PokemonDetails from './pages/PokemonDetails'
import TrainerForm from './pages/TrainerForm'
import TrainerList from './pages/TrainerList'
import TrainerDetail from './pages/TrainerDetails'
import PokemonEdit from './pages/PokemonEdit'
import Login from './pages/Login'

import './App.css'

function App() {

  return (
    <BrowserRouter>

      <Header />

      <Container sx={{ mt: 3 }}>

        <Routes>

          {/* Pokemons */}
          <Route path='/' element={<PokemonList />} />
          <Route path='/add-pokemon' element={<PokemonForm />} />
          <Route path='/pokemon/edit/:id' element={<PokemonEdit />} />

          {/* Auth */}
          <Route path='/login' element={<Login />} />

          {/* Trainers */}
          <Route path='/trainer' element={<TrainerList />} />
          <Route path='/add-trainer' element={<TrainerForm />} />
          <Route path='/trainers/:id' element={<TrainerDetail />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />


        </Routes>

      </Container>

    </BrowserRouter>
  )
}

export default App
