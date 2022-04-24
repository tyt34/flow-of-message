import React, { useState } from 'react'
import './App.css'
import Message from '../Message/Message'
import CheckBox from '../CheckBox/CheckBox'

function App() {
  const [sort, setSort] = useState(false)
  const [style, setStyle] = useState(true)

  function useSort() {
    console.log('use Sort')
    setSort(!sort)
  }

  function useStyle() {
    console.log('use Style ', style)
    setStyle(!style)
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
          leftText="Из макета"
          rightText="Упрощенный"
          check={style}
          setCheck={setStyle}
        />
      </section>
      <section className="main">
        <section className="main__favor">
          <Message />
          <Message />
        </section>
        <section className="main__flow">
          <Message />
          <Message />
          <Message />
        </section>
      </section>
    </section>
  )
}

export default App;
/*
<CheckBox
  leftText="Сверху"
  rightText="Снизу"
  check={style}
  handleCheck={useSort}
/>

<CheckBox
  leftText="Из макета"
  rightText="Упрощенный"
  check={sort}
  handleCheck={useStyle}
/>
*/
