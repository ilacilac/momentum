import React, { useState, useEffect, useCallback } from "react";
import classNames from "classnames";
import "./Clock.scss";

export default function ClockContainer() {
  const [date, setDate] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const hour = date.getHours();
  const min = date.getMinutes();

  useEffect(() => {
    tick();
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);

  function tick() {
    setDate(new Date());
  }

  useEffect(() => {
    greet();
    const greetID = setInterval(() => greet(), 1000);
    return function cleanup() {
      clearInterval(greetID);
    };
  });

  function greet() {
    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }

  return (
    <div>
      <Clock hour={hour} min={min} greeting={greeting}></Clock>
    </div>
  );
}

export function Clock({ hour, min, greeting }) {
  const [inputname, setInputName] = useState({
    name: "",
    inputBoxisHidden: false,
  });
  const { name, inputBoxisHidden } = inputname;

  const [userNameisHidden, setUserNameisHidden] = useState(true);

  // useEffect(() => {
  //   setName(name ? localStorage.getItem("name") : "");
  //   // setHidden(!name ? true : false);
  // }, [name]);

  const onInputName = (e) => {
    setInputName({
      ...inputname,
      name: e.target.value,
    });
  };
  const onSaveName = (e) => {
    if (e.keyCode !== 13 || name.trim() === "") return;
    setInputName({
      name: e.target.value,
      inputBoxisHidden: true,
    });
    setUserNameisHidden(false);
    localStorage.setItem("name", name);
  };
  const onChangeName = (e) => {
    setInputName({
      ...inputname,
      inputBoxisHidden: false,
    });
    setUserNameisHidden(true);
  };

  useEffect(() => {
    const getName = localStorage.getItem("name");
    if (getName !== null) {
      // setInputName({ name: getName, inputBoxisHidden: true });
      setInputName({ name: getName, inputBoxisHidden: true });
      setUserNameisHidden(false);
    }
    console.log(name);
  }, [name]); 

  return (
    <div className="clockWrapper">
      <div className="clock">
        {hour > 9 ? hour : `0${hour}`}:{min > 9 ? min : `0${min}`}
      </div>
      <div className="greetings">
        <span>{greeting}, </span>
        <input
          type="text"
          className={classNames("userName", { inputBoxisHidden })}
          value={name}
          onChange={onInputName}
          onKeyDown={onSaveName}
          size="5"
          maxLength="22"
        />
        <span
          className="savedName"
          style={{ display: userNameisHidden ? "none" : "inline-block" }}
          onDoubleClick={onChangeName}
        >
          {name}
        </span>
      </div>
    </div>
  );
}
