import { Container, Grid } from '@mui/material'
import React from 'react'
import './App.css'
import { pokemons } from './data/pokemons'
import PokemonCard from './components/PokemonCard'
import Header from './components/Header'
import PokemonList from './components/PokemonsList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PokemonForm from './components/PokemonForm'

function App() {

  return (
    <>
      <Header />
      <Container>
        <BrowserRouter>
          {/* Aqui iran las routas */}
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/add-pokemon" element={<PokemonForm />} />
          </Routes>
        </BrowserRouter> 
      </Container>
    </>
  )
}

export default App
