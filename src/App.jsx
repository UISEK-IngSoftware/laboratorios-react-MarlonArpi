import { Container } from '@mui/material'
import Header from './components/Header'
import PokemonList from './components/PokemonList'
import './App.css'

function App() {
  return (
    <>
     <Header/>
     <Container>
       <PokemonList/>
      </Container>
    </>
  )
}


export default App
