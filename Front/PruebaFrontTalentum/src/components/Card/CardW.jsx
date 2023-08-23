import React, { useEffect, useState } from 'react'
import { Get } from '../../api';
import '../../styles/cardStyle.css';
import iconTemp from '../../assets/temp.png';
import iconHum from '../../assets/humidity.png';
import iconWind from '../../assets/wind.png';

export default function Card(props) {

  //propiedades
  const {cityName} = props

  //estados
  const [info, setInfo] = useState();

  //llamado de api
  const callbackAPI = () => {

    //tomamos el nombre de la ciudad y la promesa
    Get(cityName).then((data) => {
      console.log(data);
      setInfo(data);
    }).catch(() => {
      console.error('hubo un error');
    }) 
  }

  //cambia la info de acuerdo al nombre de la ciudad, llama a la api al cambiar el nombre de la ciudad
  useEffect(callbackAPI, [cityName]);

  //ajustamos el formato de la fecha
  const formatDate = (date) => {

    //creamos una variable que va a contener la fecha actua;
    const actdate = new Date(date);

    //arreglo de los meses para saber cual vamos a necesitar
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    //asignamos cada parte de la fecha, es decir, dia/mes/anho
    const day = actdate.getDay();
    const monthNumber = actdate.getMonth() + 1;//sumamos 1 ya que son 12 meses, pero estos aqui van de 0 a 11
    const year = actdate.getFullYear();

    const nameMonth = months[monthNumber];

    //Formateamos la fehca en el orden deseado(dia/mes/anho)
    const formatDate = `${day} ${nameMonth} ${year}`;
    return formatDate;
  }

  //componente interno el cual va a contener la informacion de la barra inferior de la card
  const CardInfComponent = (propsCarinf) => {

    //declaramos las propiedades
    const {barInfe, icon, nameMedition, varData, symbol} = propsCarinf

    //devolvemos el componente
    return(
      <div className={`o-cardInf ${barInfe?'o-Barinf':''}`}>{/*condicional de la barra separadora */}
        <div className='o-cardInfIzq'>
          <img className='o-iconImg' src={icon} />
          <div className='nameMed'>{nameMedition}</div>
        </div>

        <div className='o-cardInfDer'>
          <div className='Medition'>{varData}{symbol || ''}</div>
        </div>
      </div>
    )
  }

  return (
    <div className='o-card'>
        <div className='o-cardSup'>

          <div className='o-cardSupInter'>
            <div className='o-backgroundTitle'>
              <div className='o-titleNameCity'>{info?.nameCity || 'Ciudad no valida'}</div>
            </div>
            <div className='o-date'>{info?.date? formatDate(info?.date) : 'Fecha'}</div>
            <div className='o-tempSup'>{info?.temp || '--'}º</div>
            <div className='o-errorCityName'>{info?.errorMsj}</div>
          </div>

          <div className='o-cardSupBottom'>
            <div className='o-weather'><strong>Clima /</strong>{info?.weather || '----'}</div>
          </div>           

        </div>

        <div className='o-cardInfContainer'>
          <div className='o-cardInfComponentsContainer'>
            <CardInfComponent  barInfe icon={iconTemp} nameMedition='Temperatura' varData={info?.temp || ''} symbol=''/>
            <CardInfComponent  barInfe icon={iconHum} nameMedition='Humedad' varData={info?.hum || ''} symbol='%'/>
            <CardInfComponent  icon={iconWind} nameMedition='Velocidad Viento' varData={info?.wind || ''} symbol='m/s'/>
          </div>
        </div>
    </div>
  )
}
