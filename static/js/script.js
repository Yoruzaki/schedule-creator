let teachers = [];
let modules = [];
let rooms = [];

function addTeacher() {
    const name = document.getElementById('teacherName').value;
    const availability = Array.from(document.querySelectorAll('#teacherAvailability input:checked')).map(input => input.value);
    const mobility = document.getElementById('mobility').value;

    if (name && availability.length > 0) {
        teachers.push({ name, availability, mobility });
        updateModuleTeacherOptions();
        alert(`Added teacher: ${name}`);
    } else {
        alert('Please fill all fields');
    }
}

function addModule() {
    const name = document.getElementById('moduleName').value;
    const group = document.getElementById('group').value;
    const teacher = document.getElementById('moduleTeacher').value;
    const duration = document.getElementById('duration').value;
    const groupCapacity = document.getElementById('groupCapacity').value; // New capacity input

    if (name && group && teacher && duration && groupCapacity) {
        modules.push({ name, group, teacher, duration, capacity: groupCapacity }); // Include capacity
        alert(`Added module: ${name}`);
    } else {
        alert('Please fill all fields');
    }
}

function addRoom() {
    const name = document.getElementById('roomName').value;
    const capacity = document.getElementById('roomCapacity').value;
    const floor = document.getElementById('roomFloor').value; // New floor input

    if (name && capacity && floor) {
        rooms.push({ name, capacity, floor }); // Include floor
        alert(`Added room: ${name}`);
    } else {
        alert('Please fill all fields');
    }
}


function updateModuleTeacherOptions() {
    const moduleTeacherSelect = document.getElementById('moduleTeacher');
    moduleTeacherSelect.innerHTML = '';
    teachers.forEach(teacher => {
        const option = document.createElement('option');
        option.value = teacher.name;
        option.text = teacher.name;
        moduleTeacherSelect.appendChild(option);
    });
}

function generateSchedule() {
    fetch('/generate_schedule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teachers, modules, rooms }),
    })
    .then(response => response.json())
    .then(data => {
        displaySchedule(data.schedule);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function displaySchedule(schedule) {
    const tableDiv = document.getElementById('scheduleTable');
    tableDiv.innerHTML = '';

    let tableHTML = '<table><thead><tr><th>Day</th>';
    const timeSlots = ["08:00-10:00", "10:00-12:00", "13:00-15:00", "15:00-17:00"];
    timeSlots.forEach(slot => tableHTML += `<th>${slot}</th>`);
    tableHTML += '</tr></thead><tbody>';

    for (const day in schedule) {
        tableHTML += `<tr><td>${day}</td>`;
        for (let i = 0; i < timeSlots.length; i++) {
            tableHTML += `<td>${schedule[day][i] || 'Free'}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</tbody></table>';
    tableDiv.innerHTML = tableHTML;
}

function downloadPDF() {
    const element = document.getElementById('scheduleTable');
    const opt = {
        margin:       1,
        filename:     'schedule.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
}
