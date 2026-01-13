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
import PokemonDisplay from './pages/PokemonDisplay'
import PokemonEdit from './pages/PokemonEdit'
import TrainersList from './pages/TrainersList'
import TrainerDisplay from './pages/TrainerDisplay'
import TrainerForm from './pages/TrainerForm'
import TrainerEdit from './pages/TrainerEdit'

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
            <Route path="/details/:id" element={<PokemonDisplay />} />
            <Route path="/update/:id" element={<PokemonEdit />} />
            <Route path="/trainers" element={<TrainersList />} />
            <Route path="/trainers/details/:id" element={<TrainerDisplay />} />
            <Route path="/trainers/add-trainer" element={<TrainerForm />} />
            <Route path="/trainers/update/:id" element={<TrainerEdit />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  )
}

export default App
