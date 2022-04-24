import React, { useState, useEffect } from 'react'
import './Message.css'
import user from '../../images/user.png'
import ilus from '../../images/ilus.png'
import starOn from '../../images/star-on.png'
import starOff from '../../images/star-off.png'
import arrow from '../../images/arrow.png'
import bottle from '../../images/bottle.png'
import mech from '../../images/mech.png'

function Message(
  {
    style, time, fName, sName, now, text, translateText,
    favorite, setFavorite, isLike, arrMess, setArrMess
  }
) { // style false это упрощенный
  const [like, setLike] = useState(false)

  useEffect( () => {
    let altMainArr = arrMess.slice()
    altMainArr.map( (mess, i) => {
      favorite.map( (favMes) => {
        if ((mess.now === favMes.now) && (mess.fName === favMes.fName)) {
          mess.isLike = true
        }
      })
    })
    setArrMess(altMainArr)
  }, [])

  useEffect( () => {
    if (isLike !== undefined) {
      setLike(isLike)
    }
  }, [favorite.length, arrMess])

  function handleLikeClick() {
    setLike(!like)
    if (!like) {
      // добавление сообщения в массив "избранное"
      let newArr = favorite.slice()
      newArr.push({style, time, fName, sName, now, text, translateText, isLike: true})
      setFavorite(newArr)
      localStorage.setItem('favor', JSON.stringify(newArr))
      // добавление лайка в массив "главное"
      let altMainArr = arrMess.slice()
      altMainArr.map( (mess, i) => {
        if ((mess.now === now) && (mess.fName === fName)) {
          mess.isLike = true
        }
      })
      setArrMess(altMainArr)
    } else {
      // удаление сообщения из массива "избранное"
      let newArr = favorite.slice()
      let indexForDel
      newArr.map( (mess, i) => {
        if ((mess.now === now) && (mess.fName === fName)) {
          indexForDel = i
        }
      })
      newArr.splice(indexForDel, 1)
      setFavorite(newArr)
      localStorage.setItem('favor', newArr)
      // удаление лайка из массива "главное"
      let altMainArr = arrMess.slice()
      altMainArr.map( (mess, i) => {
        if ((mess.now === now) && (mess.fName === fName)) {
          mess.isLike = false
        }
      })
      setArrMess(altMainArr)
    }
  }

  return (
    <>
    <section className="message">
      <section className="message__left">
        <img
          className="message__img"
          alt="иконка пользователя"
          src={user}
        />
        <p className="message__time">
          {time}
        </p>
      </section>
      <section className="message__right">
        <section className="message__top">
          <section className="message__top-left">
            <p className="message__text-user">
              {fName} {sName}
            </p>
            {
              style ?
              (
                <p className="message__text-info">
                  Текст поста в соц. сетях если это комментарий
                </p>
              ) : (
                <>
                </>
              )
            }
          </section>
          <section className="message__top-right">
            {
              style ?
              (
                <>
                  <section className="message__cvadro">
                    <p className="message__cvadro-text">
                      Левый
                    </p>
                  </section>
                  <section className="message__cvadro">
                    <p className="message__cvadro-text">
                      Центр
                    </p>
                  </section>
                  <section className="message__cvadro">
                    <p className="message__cvadro-text">
                      Правый
                    </p>
                  </section>
                  <img
                    className="message__arrow"
                    alt="иконка стрелочки"
                    src={arrow}
                  />
                  <img
                    className="message__bottle"
                    alt="иконка банка - вид сбоку"
                    src={bottle}
                  />
                  <img
                    className="message__mech"
                    alt="иконка шестиренки"
                    src={mech}
                  />
                </>
              ) : (
                <>
                </>
              )
            }
            <button
              className="message__but"
              onClick={handleLikeClick}
            >
              <img
                className="message__star"
                alt="иконка кнопки добавления в избранное"
                src={like ? starOn : starOff}
              />
            </button>
          </section>
        </section>
        <section className="message__bottom">
          <p className="message__main-text">
            EN: {text}
            <br/>
            RU: {translateText}
          </p>
          {
            style ?
            (
              <>
                <p className="message__next">
                  Далее
                </p>
                <img
                  className="message__ilus"
                  alt="илюстрация сообщения"
                  src={ilus}
                />
              </>
            ) : (
              <>
              </>
            )
          }
        </section>
      </section>
    </section>
    <section className="message-footer">
      {
        style ?
        (
          <>
            <p className="message__text-blue">
              #Новое
            </p>
            <p className="message__text-black">
              #Эксперт
            </p>
          </>
        ) : (
          <>
          </>
        )
      }
    </section>
    </>
  )
}

export default Message;
