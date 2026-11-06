
const calendar = document.getElementById("calendar");

const trainingDays = {
    1: "upper",
    5: "lower",
    9: "upper",
    13: "lower",
    17: "upper",
    21: "lower",
    25: "upper",
    29: "lower"
};

const exercises = {
    upper: [
        ["Жим в тренажёре", "2 × 8–12"],
        ["Тяга верхнего блока", "2 × 10–12"],
        ["Горизонтальная тяга", "2 × 10–12"],
        ["Жим гантелей под углом", "2 × 8–12"],
        ["Подъём гантелей в стороны", "2 × 12–15"],
        ["Разгибание рук на блоке", "2 × 10–15"],
        ["Сгибание рук с гантелями", "2 × 10–12"]
    ],

    lower: [
        ["Жим ногами", "2 × 10–12"],
        ["Сгибание ног", "2 × 10–15"],
        ["Румынская тяга с гантелями", "2 × 8–10"],
        ["Разгибание ног", "2 × 12–15"],
        ["Подъём на носки", "2 × 12–15"],
        ["Планка", "2 × 20–40 сек"]
    ]
};

let completedDays = JSON.parse(
    localStorage.getItem("completedDays") || "[]"
);

let selectedDay = null;

const weekdays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

weekdays.forEach(day => {
    const element = document.createElement("div");
    element.className = "day-name";
    element.textContent = day;
    calendar.appendChild(element);
});

// Ноябрь 2026 начинается в воскресенье
const firstDay = 6;
const totalDays = 30;

for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.className = "day empty";
    calendar.appendChild(empty);
}

for (let day = 1; day <= totalDays; day++) {
    const element = document.createElement("div");

    let type = "work";
    let label = "Работа";

    if (trainingDays[day]) {
        type = "training";
        label = trainingDays[day] === "upper"
            ? "Верх тела"
            : "Низ тела";
    } else if ([2, 6, 10, 14, 18, 22, 26, 30].includes(day)) {
        type = "rest";
        label = "Отдых";
    }

    element.className = `day ${type}`;

    if (completedDays.includes(day)) {
        element.classList.add("done");
    }

    element.innerHTML = `
        <div class="day-number">${day}</div>
        <div class="day-label">${completedDays.includes(day) ? "Выполнено ✓" : label}</div>
    `;

    element.addEventListener("click", () => {
        document.querySelectorAll(".day").forEach(item => {
            item.classList.remove("selected");
        });

        element.classList.add("selected");
        selectedDay = day;

        showWorkout(day, type);
    });

    calendar.appendChild(element);
}

function showWorkout(day, type) {
    const title = document.getElementById("workout-title");
    const content = document.getElementById("workout-content");

    if (type !== "training") {
        title.textContent = `День ${day}`;

        const messages = {
            rest: "Сегодня отдых. Восстанавливайся и набирай силы.",
            work: "Сегодня рабочий день. Не забывай про питание и сон."
        };

        content.innerHTML = `<p>${messages[type]}</p>`;
        return;
    }

    const workoutType = trainingDays[day];
    const list = exercises[workoutType];

    title.textContent = workoutType === "upper"
        ? "Тренировка — верх тела"
        : "Тренировка — низ тела";

    content.innerHTML = `
        ${list.map((exercise, index) => `
            <div class="exercise">
                <div>
                    <strong>${exercise[0]}</strong>
                    <br>
                    <span>${exercise[1]}</span>
                </div>
                <input type="checkbox" class="exercise-check"
                    aria-label="Выполнено: ${exercise[0]}">
            </div>
        `).join("")}

        <button class="done-button" onclick="completeWorkout()">
            Отметить тренировку выполненной
        </button>
    `;
}

function completeWorkout() {
    if (!selectedDay || !trainingDays[selectedDay]) return;

    if (!completedDays.includes(selectedDay)) {
        completedDays.push(selectedDay);
    }

    localStorage.setItem(
        "completedDays",
        JSON.stringify(completedDays)
    );

    updateStats();
    location.reload();
}

function updateStats() {
    const count = completedDays.length;

    document.getElementById("completed").textContent = `${count} / 8`;

    document.getElementById("progress").textContent =
        `${Math.round(count / 8 * 100)}%`;
}

updateStats();
