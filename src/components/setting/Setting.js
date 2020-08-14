import React, {useEffect, useRef} from 'react';
import "./setting.scss";
import { MdSettings } from "react-icons/md";

export default function Setting() {
  const btnRef = useRef(null);

  const hourSet12 = useRef(null);
  const hourSet24 = useRef(null);
  const hourCheck = useRef("true");

  let settingList = [
    {id: 1, text: "Weather", check: true},
    {id: 2, text: "Todos", check: true},
    { id: 3, text: "Clock", check: true },
  ];

  const LS_SETTING = localStorage.getItem("setting");
  const LS_HOURFORMAT = localStorage.getItem("hourformat")
  if (LS_SETTING !== null) {
    const parseSet = JSON.parse(LS_SETTING);
    settingList = parseSet;
  }
  if (LS_HOURFORMAT !== null) {
    hourCheck.current = LS_HOURFORMAT;
  }
  const handleClickOutside = (e) => {
    if (btnRef.current && !btnRef.current.contains(e.target)) {
      btnRef.current.classList.remove("active");
    } else {
      btnRef.current.classList.add("active");
    }
  };

  useEffect(() => {
    settingList.forEach(item => {
      if (!item.check) {
        switch (item.text) {
          case "Weather":
            document.querySelector(".weather-btn").classList.add("hidden");
            break;
          case "Todos":
              document.querySelector(".mainTodoBtn").classList.add("hidden");
            break;
          case "Clock":
              document.querySelector(".clock").classList.add("hidden");
            break
          default:
            console.log("초기화 실패");
        }
      }
    })
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [settingList]);

  function settingChange(e) {
    const $label = e.target.parentNode.parentNode;
    const $labelCtr = $label.getAttribute("data-ctr");
    if ($label.classList.contains("active")) {
      $label.className = "";
      switch ($labelCtr) {
        case "Weather":
          document.querySelector(".weather-btn").classList.add("hidden");
          settingList[0].check = false;
          break;
        case "Todos":
          document.querySelector(".mainTodoBtn").classList.add("hidden");
          settingList[1].check = false;
          break;
        case "Clock":
          document.querySelector(".clock").classList.add("hidden");
          settingList[2].check = false;
          break;
        default:
          console.log("알 수 없는 에러");
      }
    } else {
      $label.className = "active";
      switch ($labelCtr) {
        case "Weather":
          document.querySelector(".weather-btn").classList.remove("hidden");
          settingList[0].check = true;
          break;
        case "Todos":
          document.querySelector(".mainTodoBtn").classList.remove("hidden");
          settingList[1].check = true;
          break;
        case "Clock":
          document.querySelector(".clock").classList.remove("hidden");
          settingList[2].check = true;
          break;
        default:
          console.log("알 수 없는 에러");
      }
    }
    console.log(settingList);
    localStorage.setItem("setting", JSON.stringify(settingList));
  }

  function timeSet() {
    if (hourSet12.current.classList.contains("active")) {
      hourCheck.current = true;
      hourSet24.current.classList.add("active");
      hourSet12.current.classList.remove("active");

    } else {
      hourCheck.current = false;
      hourSet24.current.classList.remove("active");
      hourSet12.current.classList.add("active");
    }
    localStorage.setItem("hourformat", hourCheck.current);
  }

    return (
      <button ref={btnRef} className="setting-btn">
        <MdSettings />
        <div className="setting-container">
          <ul className="setting-list">
            <li>General</li>
          </ul>
          <div className="setting-custom">
            <h2>General</h2>
            <p>Customize your dashboard</p>
            <h3>SHOW</h3>
            <ul>
              {settingList.map((item) => (
                <li key={item.id}>
                  <label
                    data-ctr={item.text}
                    className={item.check ? "active" : ""}
                  >
                    {item.text}
                    <div className="view-ctr">
                      <input
                        checked={item.check}
                        type="checkbox"
                        onChange={settingChange}
                      />
                      <span className="btn"></span>
                    </div>
                  </label>
                </li>
              ))}
              <h3>OPTIONS</h3>
              <ul>
                <li>
                  <label>
                    Clock Format
                    <div className="clock-ctr">
                      <input type="checkbox" onChange={timeSet} />
                      <span
                        ref={hourSet12}
                        className={(hourCheck.current === "false" ? "active" : "")}
                      >
                        12 hour
                      </span>
                      <span> | </span>
                      <span
                        ref={hourSet24}
                        className={(hourCheck.current === "true" ? "active" : "")}
                      >
                        24 hour
                      </span>
                    </div>
                  </label>
                </li>
              </ul>
            </ul>
          </div>
        </div>
      </button>
    );
  }