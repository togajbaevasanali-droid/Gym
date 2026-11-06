// ==========================================
// GYM PLANNER — НОЯБРЬ 2026
// ==========================================

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

const totalWorkouts = Object.keys(trainingDays).length;

const upperExercises = [
    {
        name: "Жим от груди в тренажёре",
        sets: "2 подхода × 8–12 повторений",
        description: "Настрой сиденье так, чтобы рукоятки находились примерно на уровне середины груди.",
        video: "жим от груди в тренажере техника выполнения"
    },
    {
        name: "Тяга верхнего блока к груди",
        sets: "2 подхода × 10–12 повторений",
        description: "Тяни рукоять к верхней части груди, не раскачивай корпус.",
        video: "тяга верхнего блока к груди техника выполнения"
    },
    {
        name: "Горизонтальная тяга сидя",
        sets: "2 подхода × 10–12 повторений",
        description: "Сохраняй ровную спину и тяни рукоять к животу.",
        video: "горизонтальная тяга сидя техника выполнения"
    },
    {
        name: "Жим гантелей под углом",
        sets: "2 подхода × 8–12 повторений",
        description: "Используй небольшой вес. Опускай гантели контролируемо, без резких движений.",
        video: "жим гантелей на наклонной скамье техника выполнения"
    },
    {
        name: "Подъём гантелей в стороны",
        sets: "2 подхода × 12–15 повторений",
        description: "Поднимай руки примерно до уровня плеч. Не раскачивай корпус.",
        video: "махи гантелями в стороны техника выполнения"
    },
    {
        name: "Разгибание рук на верхнем блоке",
        sets: "2 подхода × 10–15 повторений",
        description: "Прижми локти к корпусу и разгибай руки без рывков.",
        video: "разгибание рук на верхнем блоке техника выполнения"
    },
    {
        name: "Сгибание рук с гантелями",
        sets: "2 подхода × 10–12 повторений",
        description: "Не помогай себе корпусом. Поднимай и опускай гантели плавно.",
        video: "сгибание рук с гантелями техника выполнения"
    }
];

const lowerExercises = [
    {
        name: "Жим ногами в тренажёре",
        sets: "2 подхода × 10–12 повторений",
        description: "Не выпрямляй колени резко и не отрывай таз от спинки тренажёра.",
        video: "жим ногами в тренажере техника выполнения"
    },
    {
        name: "Сгибание ног сидя",
        sets: "2 подхода × 10–15 повторений",
        description: "Плавно сгибай ноги и контролируй возвращение в исходное положение.",
        video: "сгибание ног сидя в тренажере техника выполнения"
    },
    {
        name: "Разгибание ног в тренажёре",
        sets: "2 подхода × 10–12 повторений",
        description: "Не бросай вес вниз и не делай резких движений коленями.",
        video: "разгибание ног в тренажере техника выполнения"
    },
    {
        name: "Отведение ног в тренажёре",
        sets: "2 подхода × 12–15 повторений",
        description: "Разводи ноги плавно, не используй инерцию.",
        video: "отведение ног в тренажере техника выполнения"
    },
    {
        name: "Подъём на носки в тренажёре",
        sets: "2 подхода × 12–15 повторений",
        description: "Поднимайся на носки и опускай пятки контролируемо.",
        video: "подъем на носки в тренажере техника выполнения"
    },
    {
        name: "Скручивания на пресс в тренажёре",
        sets: "2 подхода × 12–15 повторений",
        description: "Скручивай корпус за счёт мышц живота, не тяни себя руками.",
        video: "скручивания на пресс в тренажере техника выполнения"
    }
];

// ==========================================
// СОХРАНЕНИЕ ПРОГРЕССА
// ==========================================

function getStorage(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    } catch (error) {
        return fallback;
    }
}

let completedDays = getStorage("gymCompletedDays", []);
let exerciseChecks = getStorage("gymExerciseChecks", {});

let selectedDay = null;

// ==========================================
// КАЛЕНДАРЬ
// ==========================================

const calendarGrid = document.getElementById("calendarGrid");

function getDayType(day) {
    if (trainingDays[day]) return "training";

    const restDays = [2, 6, 10, 14, 18, 22, 26, 30];

    if (restDays.includes(day)) return "rest";

    return "work";
}

function renderCalendar() {
    calendarGrid.innerHTML = "";

    // 1 ноября 2026 года — воскресенье.
    // В календаре неделя начинается с понедельника.
    const firstDayOffset = 6;
    const daysInMonth = 30;

    for (let i = 0; i < firstDayOffset; i++) {
        const empty = document.createElement("div");
        empty.className = "day empty";
        calendarGrid.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const type = getDayType(day);

        const button = document.createElement("button");
        button.type = "button";
        button.className = `day ${type}`;

        if (completedDays.includes(day)) {
            button.classList.add("completed");
        }

        if (selectedDay === day) {
            button.classList.add("selected");
        }

        let status = "РАБОТА";

        if (type === "training") status = "ЗАЛ";
        if (type === "rest") status = "ОТДЫХ";
        if (completedDays.includes(day)) status = "ГОТОВО";

        button.innerHTML = `
            <span class="day-number">${day}</span>
            <span class="day-status">${status}</span>
        `;

        button.addEventListener("click", () => selectDay(day));

        calendarGrid.appendChild(button);
    }
}

// ==========================================
// ВЫБОР ДНЯ
// ==========================================

function selectDay(day) {
    selectedDay = day;
    renderCalendar();

    const type = getDayType(day);

    if (type !== "training") {
        document.getElementById("workoutContent").classList.add("hidden");
        document.getElementById("emptyState").classList.remove("hidden");

        document.getElementById("workoutTitle").textContent =
            type === "rest" ? "ДЕНЬ ОТДЫХА" : "РАБОЧИЙ ДЕНЬ";

        document.getElementById("workoutDate").textContent =
            `${day} ноября 2026`;

        document.querySelector("#emptyState h3").textContent =
            type === "rest" ? "Сегодня отдых" : "Сегодня рабочий день";

        document.querySelector("#emptyState p").textContent =
            type === "rest"
                ? "Восстановление — тоже часть тренировочного процесса. Отдохни и набирайся сил."
                : "Сегодня тренировка не запланирована. Не забывай про сон, питание и восстановление.";

        return;
    }

    showWorkout(day);
}

// ==========================================
// ОТОБРАЖЕНИЕ ТРЕНИРОВКИ
// ==========================================

function showWorkout(day) {
    const workoutType = trainingDays[day];
    const isUpper = workoutType === "upper";

    const exercises = isUpper ? upperExercises : lowerExercises;

    document.getElementById("emptyState").classList.add("hidden");
    document.getElementById("workoutContent").classList.remove("hidden");

    document.getElementById("workoutTitle").textContent =
        isUpper ? "ТРЕНИРОВКА ВЕРХА ТЕЛА" : "ТРЕНИРОВКА НИЗА ТЕЛА";

    document.getElementById("workoutDate").textContent =
        `${day} ноября 2026`;

    document.getElementById("workoutType").textContent =
        isUpper ? "UPPER BODY" : "LOWER BODY";

    document.getElementById("workoutSubtitle").textContent =
        isUpper ? "ВЕРХ ТЕЛА" : "НИЗ ТЕЛА";

    const workoutNumber = Object.keys(trainingDays).indexOf(String(day)) + 1;

    document.getElementById("workoutNumber").textContent =
        String(workoutNumber).padStart(2, "0");

    const exerciseList = document.getElementById("exerciseList");
    exerciseList.innerHTML = "";

    exercises.forEach((exercise, index) => {
        const checkKey = `${day}-${index}`;
        const isChecked = Boolean(exerciseChecks[checkKey]);

        const card = document.createElement("div");
        card.className = `exercise-card ${isChecked ? "done" : ""}`;

        const videoUrl =
            "https://www.youtube.com/results?search_query=" +
            encodeURIComponent(exercise.video);

        card.innerHTML = `
            <input
                class="exercise-check"
                type="checkbox"
                ${isChecked ? "checked" : ""}
                aria-label="Отметить упражнение ${exercise.name}"
            >

            <div class="exercise-info">
                <h4>${exercise.name}</h4>
                <p>${exercise.description}</p>
            </div>

            <div class="exercise-meta">${exercise.sets}</div>

            <a
                class="video-button"
                href="${videoUrl}"
                target="_blank"
                rel="noopener noreferrer"
            >
                ▶ Смотреть видео
            </a>
        `;

        const checkbox = card.querySelector(".exercise-check");

        checkbox.addEventListener("change", () => {
            exerciseChecks[checkKey] = checkbox.checked;
            localStorage.setItem(
                "gymExerciseChecks",
                JSON.stringify(exerciseChecks)
            );

            card.classList.toggle("done", checkbox.checked);
            updateCompleteButton(exercises, day);
        });

        exerciseList.appendChild(card);
    });

    updateCompleteButton(exercises, day);
    document.getElementById("workout").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// ==========================================
// ЗАВЕРШЕНИЕ ТРЕНИРОВКИ
// ==========================================

function updateCompleteButton(exercises, day) {
    const button = document.getElementById("completeButton");

    const allChecked = exercises.every((exercise, index) => {
        return Boolean(exerciseChecks[`${day}-${index}`]);
    });

    if (completedDays.includes(day)) {
        button.textContent = "ТРЕНИРОВКА ВЫПОЛНЕНА ✓";
        button.disabled = true;
        return;
    }

    button.disabled = !allChecked;
    button.textContent = allChecked
        ? "ЗАВЕРШИТЬ ТРЕНИРОВКУ"
        : "ОТМЕТЬ ВСЕ УПРАЖНЕНИЯ";
}

function completeWorkout() {
    if (!selectedDay || !trainingDays[selectedDay]) return;

    const exercises = trainingDays[selectedDay] === "upper"
        ? upperExercises
        : lowerExercises;

    const allChecked = exercises.every((exercise, index) => {
        return Boolean(exerciseChecks[`${selectedDay}-${index}`]);
    });

    if (!allChecked) {
        alert("Сначала отметь все выполненные упражнения.");
        return;
    }

    if (!completedDays.includes(selectedDay)) {
        completedDays.push(selectedDay);
        localStorage.setItem(
            "gymCompletedDays",
            JSON.stringify(completedDays)
        );
    }

    renderCalendar();
    updateStats();
    updateCompleteButton(exercises, selectedDay);
}

// ==========================================
// СТАТИСТИКА
// ==========================================

function updateStats() {
    const count = completedDays.length;
    const percent = Math.round((count / totalWorkouts) * 100);

    document.getElementById("completedCount").textContent = count;
    document.getElementById("progressPercent").textContent = percent;
    document.getElementById("progressBar").style.width = `${percent}%`;
}

// ==========================================
// ЗАПУСК
// ==========================================

renderCalendar();
updateStats();
