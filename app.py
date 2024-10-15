from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Define the schedule structure: days and time slots
days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]
time_slots = ["08:00-10:00", "10:00-12:00", "13:00-15:00", "15:00-17:00"]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_schedule', methods=['POST'])
def generate_schedule():
    data = request.json
    teachers = data['teachers']
    modules = data['modules']
    rooms = data['rooms']

    # Initialize room availability
    room_availability = {room['name']: {day: [True, True, True, True] for day in days} for room in rooms}

    def is_available(day, room, slot):
        return room_availability[room][day][slot]

    def assign_module(module, day, slot, room):
        room_availability[room][day][slot] = False

    # Main schedule assignment function
    schedule = {day: [None, None, None, None] for day in days}

    for module in modules:
        teacher = next(t for t in teachers if t['name'] == module['teacher'])
        assigned = False

        for day in teacher["availability"]:
            for slot in range(len(time_slots)):
                for room in rooms:
                    if is_available(day, room['name'], slot) and room['capacity'] >= module['capacity']:  # Check capacity
                        schedule[day][slot] = f"{module['name']} - {module['group']} - {module['teacher']}"
                        assign_module(module, day, slot, room['name'])
                        assigned = True
                        break
                if assigned:
                    break
            if assigned:
                break
        if not assigned:
            print(f"Failed to assign {module['name']}")

    return jsonify({'schedule': schedule})

if __name__ == '__main__':
    app.run(debug=True)
