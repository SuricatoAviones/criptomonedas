
import styled from "@emotion/styled";
import ImagenCripto from './assets/img/imagen-criptos.png'
import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";
import { useEffect, useState } from "react";
// En el contenedor se crea dos columnas
const Contenedor = styled.h1`
max-width: 900px;
margin: 0 auto;
width: 90%;
@media (min-width:992px){
  display: grid;
  grid-template-columns: repeat(2,1fr);
  column-gap: 2rem;
}
`

const Imagen = styled.img`
  max-width: 400px;
  margin:100px auto 0 auto;
  width: 80%;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`
function App() {

  const [monedas, setMonedas] = useState({})

  //State para el resultado
  const [resultado, setResultado] = useState({})

  //State para el cargando
  const [cargando, setCargando] =useState(false)
  
  useEffect(()=>{
    if(Object.keys(monedas).length > 0){
      
      const cotizarCripto = async () =>{
        setCargando(true);
        setResultado({})

        const {moneda, criptomoneda} = monedas;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setResultado(resultado.DISPLAY[criptomoneda][moneda])
        setCargando(false)
      }
      cotizarCripto()
    }
  },[monedas])
  return (
    <>
      <Contenedor>
        <Imagen 
          src={ImagenCripto}
          alt="imagenes criptomonedas"
        />
        <div>
          <Heading>Cotiza Criptomonedas al Instante</Heading>
          <Formulario
            setMonedas={setMonedas}
          />
          {cargando && <Spinner />}
          {resultado && resultado.PRICE && <Resultado  resultado={resultado}/>}

        </div>
      </Contenedor>
    </>
  )
}

export default App
