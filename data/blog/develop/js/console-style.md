---
title: 'console.log 에 스타일 적용하기'
date: '2022-07-19T20:37:44.000+09:00'
tags: ['js', 'console']
draft: false
summary: '콘솔 창에 스타일이 적용된 문자열 출력하기'
images: ['/static/images/develop/js/console.png']
---

## console.log

프론트엔드 개발을 하다보면 제일 많이 쓰는 디버깅 방법 중 하나가 console.log 일 것이다. `debugger` 를 코드 상에 넣거나 개발자 도구를 열어 break point 를 찍고 보기도 하지만 이 때에도 console 을 같이 활용하면 편하다.

React 나 Vue 로 개발할때는 [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) 와 같이 크롬 확장자에서 설치한 도구를 주로 사용하지만 그 외에는 console.log 를 가장 자주 사용하는 것 같다.

console 은 이렇게 개발에 도움을 주기도 하고 가끔 개발자들이 다른 개발자들에게 인사하듯 아이덴티티처럼 스타일을 적용해서 보여주기도 한다.

<br />

<p align={'center'}>**Tistory 의 콘솔 화면**👇</p>

![Tistory 블로그 콘솔 창](/static/images/develop/js/console-tistory.png)

## console.log 에 스타일 적용하기

console.log 와 같이 문자열을 받는 method 에서는 치환 문자열을 제공할 수 있다고 한다.
몇 가지 제공되는 문자열이 있으나 ES6에서부터 사용 가능한 템플릿 리터럴(백틱 ``)을 사용하면 굳이 쓸 일은 없는 것 같다.

<br />

콘솔에 출력되는 글자에 css 스타일을 적용할 수 있는데, 이것도 자주 사용하진 않지만 간간히 사용하긴 해봤다.
`%c` 명령을 스타일을 적용하려는 문자열 앞에 적고 문자열 뒤에 `,` 로 연결해서 css 스타일을 입력하면 된다.

**예시 1)**

```javascript
console.log('Hello %cWorld!', 'color: red; font-weight: bold; font-size: 50px;')
```

![console log style #1](/static/images/develop/js/log-style-01.png)

<br />

한 문자열 내에서 각기 다른 스타일 적용도 가능한데, 단순히 %c 를 여러번 적고 `,` 로 연결되는 스타일을 해당 개수만큼 적으면 된다.

**예시 2)**

```javascript
console.log(
    `%cHello World\n%cMy Name Is %cCheesepaninim.`,
    'color: #789;',
    'color: black; font-weight: bold; font-size: 30px; line-height: 100px;',
    'color: orange; font-weight: bold; font-size: 30px;'
)
```

![console log style #2](/static/images/develop/js/log-style-02.png)

<br />

산만해보이지만 이렇게 화려하게도 가능하다.

**예시 3)**

```javascript
console.log(
    '%cConsole.log!\n\n\n%cWritten By Cheesepaninim',
    `font-weight: bold; font-size: 50px; color: #ff629C; text-shadow: 3px 3px 5px rgb(255, 100, 150), 6px 6px 2px rgb(255, 255, 255), 9px 9px 5px rgb(254, 221, 8), 12px 12px 2px rgb(255, 255, 255), 15px 15px 5px rgb(2, 135, 206), 18px 18px 2px rgb(255, 255, 255), 21px 21px 5px rgb(42, 21, 113)`,
    `font-weight: bold; font-size: 20px; background-color: #000; color: white;`
)
```

![console log style #3](/static/images/develop/js/console.png)

<br />

적용 가능한 css 속성은 [MDN 사이트](https://developer.mozilla.org/ko/docs/Web/API/console#콘솔_출력_꾸미기)에서 확인 가능하지만,
Firefox 기준이라고 하며 크롬에서는 단순 text 관련 css 만 적용 가능한 것 같다.
