import { useEffect, useState } from 'react'

import Card from './Card'
import axios from 'axios'

const Countries = () => {
  const [data, setData] = useState([])
  const [sortedData, setSortedData] = useState([])
  const [playOnce, setPlayOnce] = useState(true)
  const [rangeValue, setRangeValue] = useState(40)
  const [selectedRadio, setSelectedRadio] = useState('')
  const radios = ['Afrique', 'Amérique', 'Asie', 'Europe', 'Océanie']

  useEffect(() => {
    if (playOnce) {
      axios.get('https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag').then(res => {
        res.data.sort((a, b) => b.population - a.population)
        setData(res.data)
        setPlayOnce(false)
      })
    }

    data.length = rangeValue
    setSortedData(data)
  }, [data, rangeValue, playOnce])

  return (
    <div className="countries">
      <div className="sort-container">
        <input type="range" min="1" max="250" value={rangeValue} onChange={e => setRangeValue(e.target.value)} />
        <ul>
          {radios.map(radio => (
            <li key={radio}>
              <input
                type="radio"
                value={radio}
                id={radio}
                checked={radio === selectedRadio}
                onChange={e => setSelectedRadio(e.target.value)}
              />
              <label htmlFor={radio}>{radio}</label>
            </li>
          ))}
        </ul>
      </div>
      <div className="cancel">{selectedRadio && <h5 onClick={() => setSelectedRadio('')}>Annuler recherche</h5>}</div>
      <ul className="countries-list">
        {sortedData &&
          sortedData
            .filter(country => country.region.includes(selectedRadio))
            .map(country => <Card country={country} key={country.name} />)}
      </ul>
    </div>
  )
}

export default Countries
