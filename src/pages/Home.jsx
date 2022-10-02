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
        {/* <h3 className="mb-3">Este es un clon de la web de Star Wars.</h3> */}
        {/* <p>
          Star Wars, conocida también en español como La guerra de las galaxias
          es una franquicia compuesta primordialmente de una serie de películas
          concebidas por el cineasta estadounidense George Lucas en la década de
          1970, y producidas y distribuidas por The Walt Disney Company a partir
          de 2012. Su trama describe las vivencias de un grupo de personajes que
          habitan en una galaxia ficticia e interactúan con elementos como «la
          Fuerza», un campo de energía metafísico y omnipresente​ que posee un
          «lado luminoso» impulsado por la sabiduría, la nobleza y la justicia y
          utilizado por los Jedi, y un «lado oscuro» usado por los Sith y
          provocado por la ira, el miedo y el odio.
        </p>
        <p>Bla,bla,bla..., todo eso ya lo sabés...</p> */}
        <p>
          Te invito a descubrir info interesante sobre una de las sagas de
          películas más populares de todos los tiempos.
        </p>
        <p>
          Puedes empezar navegando por el basto mundo de las naves espaciales
          más icónicas de las pelis. Si eres curioso verás que a medida que te
          adentras en la web puedes encontrar mucha más info.
        </p>
        <p className="mb-4">Recuerda loguarte para acceder al contenido.</p>
        <p className="mb-4">May the force be with you!!</p>
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
