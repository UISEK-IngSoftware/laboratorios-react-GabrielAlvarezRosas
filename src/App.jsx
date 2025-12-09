import { Container, Grid } from '@mui/material'
import React from 'react'
import './App.css'
import { pokemons } from './data/pokemons'
import PokemonCard from './components/PokemonCard'
import Header from './components/Header'
import PokemonList from './components/PokemonsList'

function App() {

  return (
    <>
      <Header />
      <Container>
        <PokemonList  />
      </Container>
    </>
  )
}

export default App
