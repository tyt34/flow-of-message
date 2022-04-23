import './Message.css'
import user from '../../images/user.png'
import ilus from '../../images/ilus.png'
import starOn from '../../images/star-on.png'
import starOff from '../../images/star-off.png'
import arrow from '../../images/arrow.png'
import bottle from '../../images/bottle.png'
import mech from '../../images/mech.png'

function Message({}) {


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
          06-59
        </p>
      </section>
      <section className="message__right">
        <section className="message__top">
          <section className="message__top-left">
            <p className="message__text-user">
              Nina
            </p>
            <p className="message__text-info">
              Текст поста в соц. сетях если это комментарий
            </p>
          </section>
          <section className="message__top-right">
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
            <img
              className="message__star"
              alt="иконка кнопки добавления в избранное"
              src={starOff}
            />
          </section>
        </section>
        <section className="message__bottom">
          <p className="message__main-text">
            "Россия 1" не боится снимать сериалы о сложных и неоднозначных периодах в истории нашей страны. Это и "В круге первом", и "Жизнь и судьба", и "Зулейха". Идёт работа над "Одним днём Ивана Денисовича". Вопрос Антону Златопольскому -почему вы считаете
          </p>
          <p className="message__next">
            Далее
          </p>
          <img
            className="message__ilus"
            alt="илюстрация сообщения"
            src={ilus}
          />
        </section>
      </section>
    </section>
    <section className="message-footer">
      <p className="message__text-blue">
        #Новое
      </p>
      <p className="message__text-black">
        #Эксперт
      </p>
    </section>
    </>
  )
}

export default Message;
