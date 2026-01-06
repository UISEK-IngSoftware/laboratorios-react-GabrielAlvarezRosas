import { Container, Grid } from '@mui/material'
import React from 'react'
import './App.css'
import { pokemons } from './data/pokemons'
import PokemonCard from './components/PokemonCard'
import Header from './components/Header'
import PokemonList from './pages/PokemonsList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PokemonForm from './pages/PokemonForm'
import Login from './pages/Login'

function App() {

  return (
    <>

      <Container>
        <BrowserRouter>
          {/* Aqui iran las routas */}
          <Header />
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/add-pokemon" element={<PokemonForm />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  )
}

export default App
