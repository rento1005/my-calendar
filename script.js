let currentDate = new Date();
let selectedDate = "";

function showCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // 年月を表示
    document.getElementById("month").textContent =
        year + "年 " + (month + 1) + "月";

    const days = document.getElementById("days");
    days.innerHTML = "";

    // 月の最初の曜日
    const firstDay = new Date(year, month, 1).getDay();

    // 月の最後の日
    const lastDate = new Date(year, month + 1, 0).getDate();

    // 月初めまでの空白
    for (let i = 0; i < firstDay; i++) {
        days.innerHTML += "<div></div>";
    }

    // 日付を表示
    for (let i = 1; i <= lastDate; i++) {
        const day = document.createElement("div");

        day.className = "day";
        day.textContent = i;

        day.onclick = function () {
            selectedDate = year + "-" +
                String(month + 1).padStart(2, "0") + "-" +
                String(i).padStart(2, "0");

            document.getElementById("selectedDate").textContent =
                selectedDate;

            showCalendar();
            //選択した日の予定を表示
            showEvents();
        };

        if (selectedDate === year + "-" +
            String(month + 1).padStart(2, "0") + "-" +
            String(i).padStart(2, "0")) {
            day.classList.add("selected");
        }

        days.appendChild(day);
    }
}

// 月を変更
function changeMonth(value) {
    currentDate.setMonth(currentDate.getMonth() + value);
    showCalendar();
}

// カレンダーを最初に表示
showCalendar();


// 予定を保存する
let events = JSON.parse(localStorage.getItem("events")) || {};

// 予定を追加する
function addEvent() {
    const input = document.getElementById("eventInput");
    const text = input.value;

    // 日付が選択されているか確認
    if (selectedDate === "") {
        alert("日付を選択してください");
        return;
    }

    // 予定が入力されているか確認
    if (text === "") {
        alert("予定を入力してください");
        return;
    }

    // 日付ごとに予定を保存
    if (!events[selectedDate]) {
        events[selectedDate] = [];
    }

    events[selectedDate].push(text);
    localStorage.setItem("events", JSON.stringify(events));

    // 入力欄を空にする
    input.value = "";

    // 予定を表示
    showEvents();
}


// 予定を表示する
function showEvents() {
    const list = document.getElementById("eventList");

    list.innerHTML = "";

    const eventArray = events[selectedDate] || [];

    eventArray.forEach(function(event, index) {
        const li = document.createElement("li");

        li.textContent = event + " ";

        // 削除ボタンを作成
        const button = document.createElement("button");
        button.textContent = "削除";

        button.onclick = function() {
            events[selectedDate].splice(index, 1);
            localStorage.setItem("events", JSON.stringify(events));

            showEvents();
        };

        li.appendChild(button);
        list.appendChild(li);
    });
}


