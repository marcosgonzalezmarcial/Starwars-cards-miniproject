import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Home = ({ setShowCard }) => {
  const handleClick = () => {
    setShowCard(false)
  }
  return (
    <main className="main text-white m-3">
      <Container>
        <h1>Bienvenid@!!</h1>
        <p className="mb-2">
          Te invito a descubrir info interesante sobre una de las sagas de
          películas más populares de todos los tiempos.
        </p>
        <p className="mb-2">
          Puedes empezar navegando por el basto mundo de las naves espaciales
          más icónicas de las pelis. Si eres curioso verás que a medida que te
          adentras en la web puedes encontrar mucha más info.
        </p>
        <p className="mb-2">Recuerda loguearte para acceder al contenido.</p>
        <p className="mb-3 mb-md-4">May the force be with you!!</p>
            <Link onClick={handleClick} to="/starships">
              <Button style={{ fontSize: 19 }} className="py-2 px-3 lead">
                ¿Te animas?
              </Button>
            </Link>
      </Container>
    </main>
  )
}

export default Home
