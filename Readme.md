**2조 : 박민지, 박해리, 윤유비**

## 1. 소개

**1) 주제 :** 모멘텀 클론 코딩

- 선정 이유

  1. 기존에 익순한 todoList 예시

  2. 컴포넌트별로 분업하기에 적합한 UI구조

**2) 프로젝트 목표**

- 리액트 기본 기술 적용하여 클론 코딩 (hook과 친해지는 시간😉)

**3) 역할 분담**

- 박민지 : todoList(오른쪽 하단)
- 박해리 : 메인화면
- 윤유비 : 설치 환경 세팅 & 옵션 설졍(왼쪽 하단) & 기상 데이터(오른쪽 상단) & 페이지 작업(Error, notFound 등)

## 2. 세부내용

**1) 사용 기술 스택**

- HTML
- SCSS
- JavaScript
- React 기본
- Git flow([https://github.com/kr-ub/momentum](https://github.com/kr-ub/momentum))

**2) 사용 라이브러리 및 API**

- axios
- react-icons
- classnames
- JSON Server
- Open Weather API
- unsplash API(랜덤 배경화면)

**3) 폴더 구조**

![https://github.com/kr-ub/momentum/blob/master/ScaffoldDirectory.PNG](https://github.com/kr-ub/momentum/blob/master/ScaffoldDirectory.PNG)

## **3. Flow Chart**

### 1) **Main**

- **랜덤 배경 화면**
  - unsplash API : nature & daily 업데이트
- **실시간 시계**

  - useState, useEffect

    ```jsx
    const [date, setDate] = useState(new Date());
    tick();
    const [greeting, setGreeting] = useState("");
    const hour = date.getHours();
    const min = date.getMinutes();
    useEffect(() => {
      const timerID = setInterval(() => tick(), 1000);
      return function cleanup() {
        clearInterval(timerID);
      };
    }, []);
    function tick() {
      setDate(new Date());
    }
    ```

- **인사말(아침, 점심, 저녁)**
  - useState로 시간대에 따라 다른 인사말 렌더링
- **사용자 이름 & todoList 저장**

  - localStorage

  ```jsx
  useEffect(() => {
    const getName = localStorage.getItem("name");
    if (getName !== null) {
      // setInputName({ name: getName, inputBoxisHidden: true });
      setInputName({ name: getName, inputBoxisHidden: true });
      setUserNameisHidden(false);
    }
  }, [name]);
  ```

- **input요소 → span요소로 변경**

  ```jsx
  <input className={classNames("userName", { inputBoxisHidden })}
  ```

### 2) **Todos**

- **컴포넌트 구조**

  ```jsx
  <TodosApp>
    <TodoTemplate>
      // 오른쪽 버튼 눌렀을때 나오는 팝업창
      <TodoToggle />
      // todos 목록 전체
      <TodoList>
        // todos todo 하나하나
        <TodoListItem />
      </TodoList>
      // todo 입력창
      <TodoInsert />
    </TodoTemplate>
  </TodosApp>
  ```

- **할 일 목록 가져오기**

  서버는 JSON Server을 사용하여, db.json에 있는 todos배열을 axios로 get하여 첫 랜더시 뿌려줍니다.
  todos안에는 하나의 일정이 객체형태로 id, text, checked 프로퍼티를 가지고있습니다.

- **할 일 목록 추가**

  input에 입력하면 새로운객체가 기존배열안에 들어가게 되고, id값은 useRef를 통해 todos안의 객체가 없으면 기본값 1을, 있으면 Math.max로 todos의 id중 가장 큰값에 1을 더한값으로 설정해줍니다. checked는 기본으로 false를 설정해주어 미완료 상태로 두고 onChange이벤트를 통해 value값을 계속 체크하여, onSubmit 이벤트를 통해 엔터 혹은 클릭을 눌렀을 때, text의 프로퍼티값으로 저장됩니다.
  빈 값을 입력했을때는 추가되지 않도록 return을 시켜주었습니다.
  빈 값이 아닐경우에는 axios.post를 통해 db.json에 데이터 정보를 업데이트해줍니다.

- **할 일 완료 및 삭제**

  checked를 눌렀을때는 patch를 통해 완료값을 현재상태와 반대값으로 만들어 업데이트를 해주고
  할일에 hover시, 삭제 아이콘을 보여주어, 눌렀을때 axion delete를 통해 해당 할일목록
  요소를 제거해줍니다
