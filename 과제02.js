const form = document.getElementById("recordForm");
const recordList = document.getElementById("recordList");

const teamCode = {
  "KT": "KT", "삼성": "SS", "LG": "LG", "KIA": "HT", "두산": "OB",
  "NC": "NC", "SSG": "SK", "롯데": "LT", "한화": "HH", "키움": "WO"};

form.addEventListener("submit", (e) => {
    e.preventDefault(); // 기본 새로고침 동작을 막는 게 핵심!   

    const gameData = document.getElementById("gameData").value;
    const away = document.getElementById("away").value;
    const awayscore = document.getElementById('awayscore').value;
    const home = document.getElementById('home').value;
    const homescore = document.getElementById('homescore').value;
    const note = document.getElementById('note').value;

    if (away === home) {
        alert("원정팀과 홈팀이 같을 수 없어요!");
        return; // 여기서 함수 종료 -> 리스트에 안 쌓임
    }

    const dateNoDash = gameData.replaceAll("-", "");
    const year = gameData.split("-")[0]; 
    const gameId = `${dateNoDash}${teamCode[away]}${teamCode[home]}0${year}`;
    const gameLink = `https://m.sports.naver.com/game/${gameId}/record`;

    const li = document.createElement("li");
    const matchLine = document.createElement("div");
    matchLine.textContent = `${gameData}  |  ${away} ${awayscore} : ${homescore} ${home}`;
    li.appendChild(matchLine);    

    if (note) {
        const noteLine = document.createElement("div");
        noteLine.textContent = `한줄: ${note}`;
        li.appendChild(noteLine);
    }
 
    const link = document.createElement("a");
    link.href = gameLink;
    link.textContent = "경기 기록 상세보기";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    li.appendChild(link);
 
    const delBtn = document.createElement("button");
    delBtn.textContent = "삭제";
    delBtn.type = "button"; // form 안에서 만드는 button은 기본이 submit이라 반드시 지정
    delBtn.addEventListener("click", () => {
        li.remove(); // 이 버튼이 속한 li 자기 자신만 삭제
    });
    li.appendChild(delBtn);
 
    recordList.appendChild(li);
    form.reset();
});

