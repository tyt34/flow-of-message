import React, { useState } from 'react'
import './CheckBox.css'

function CheckBox({name, leftText, rightText, check, setCheck}) {
  function changeCheck() {
    setCheck(!check)
  }

  return (
    <div className="checkbox">
      <section
        className="check"
      >
        <input
          type="checkbox"
          className="check-checkbox"
          name={name}
          id={name}
          checked={check}
          onChange={changeCheck}
        />
          <label
            className="check-label"
            htmlFor={name}
          >
            <span
              className="check-inner"
            >
            </span>
            <span
              className="check-switch"
            >
            </span>
            <span className='check__description'>
              <p className="check__text-left">
                {leftText}
              </p>
              <p className="check__text-right">
                {rightText}
              </p>
            </span>
          </label>
      </section>
    </div>
  )
}

export default CheckBox
