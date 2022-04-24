import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Message from '../Message/Message'
import CheckBox from '../CheckBox/CheckBox'
import {
  getMessages
} from '../../utils/api.js'

function App() {
  const [sort, setSort] = useState(true)
  const [style, setStyle] = useState(false)
  const [arrMess, setArrMess] = useState([])
  const [favorite, setFavorite] = useState([])

  useEffect( () => {
    getMessages()
    .then( res => {
      setArrMess(res.slice(-20))
    })
    .catch( e => {
      console.log(' er1 ', e)
    })
    if (localStorage.favor) {
      setFavorite(JSON.parse(localStorage.favor))
    }
  }, [])

  useInterval(() => {
    getMessages()
    .then( res => {
      getRightSortMess(res.slice(-20), sort)
    })
    .catch( e => {
      console.log(' er2 ', e)
    })
  }, 5000)

  function useInterval(callback, delay) {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay])
  }

  useEffect( () => {
    getRightSortMess(arrMess, sort)
  }, [sort])

  function getRightSortMess(array, sort) {
    let arrSort = array
    if (sort) {
      arrSort.sort(sortTimeUp)
    } else {
      arrSort.sort(sortTimeDown)
    }
    setArrMess([...arrSort])
  }

  function sortTimeUp(a, b) {
    if (a.now < b.now) {
      return -1;
    }
    if (a.now > b.now) {
      return 1;
    }
  }

  function sortTimeDown(a, b) {
    if (a.now < b.now) {
      return 1;
    }
    if (a.now > b.now) {
      return -1;
    }
  }

  return (
    <section className="app">
      <section className="roof">
        <section className="roof__side">
          <p className="roof__title"> Избранное </p>
        </section>

        <section className="roof__side">
          <p className="roof__title"> Главное </p>
        </section>
      </section>
      <section className="setting">
        <p className="setting__title"> Порядок вывода сообщений в категории "Главное". </p>
        <p className="setting__title"> Новое сообщение будет: </p>
        <CheckBox
          name="sort"
          leftText="Сверху"
          rightText="Снизу"
          check={sort}
          setCheck={setSort}
        />
        <p className="setting__title"> Стиль отображения сообщений: </p>
        <CheckBox
          name="style"
          leftText="Упрощенный"
          rightText="Из макета"
          check={style}
          setCheck={setStyle}
        />
      </section>
      <section className="main">
        <section className="main__favor">
          { favorite.map( (el) =>
              (
                <Message
                  key={el.now}
                  style={style}
                  time={el.time}
                  fName={el.fName}
                  sName={el.sName}
                  now={el.now}
                  text={el.text}
                  translateText={el.translateText}
                  favorite={favorite}
                  setFavorite={setFavorite}
                  arrMess={arrMess}
                  setArrMess={setArrMess}
                  isLike={el.isLike}
                />
              )
            )
          }
        </section>
        <section className="main__flow">
          { arrMess.map( (el) =>
              (
                <Message
                  key={el.now}
                  style={style}
                  time={el.time}
                  fName={el.fName}
                  sName={el.sName}
                  now={el.now}
                  text={el.text}
                  translateText={el.translateText}
                  favorite={favorite}
                  setFavorite={setFavorite}
                  arrMess={arrMess}
                  setArrMess={setArrMess}
                  isLike={el.isLike}
                />
              )
            )
          }
        </section>
      </section>
    </section>
  )
}

export default App;
