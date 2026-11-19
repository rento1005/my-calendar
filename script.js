let currentDate = new Date();

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
