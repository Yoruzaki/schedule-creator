<h1>Genetic Algorithms for University Scheduling</h1>

<p>This project implements a Genetic Algorithm (GA) to generate optimized university schedules while satisfying various constraints such as teacher availability, room capacity, and proximity. The scheduling algorithm aims to minimize conflicts and ensure a practical timetable for all involved.</p>

<h2>Schedule Structure</h2>

<p>The schedule is structured as follows:</p>

<ul>
  <li><strong>Days</strong>:
    <ul>
      <li>Sunday</li>
      <li>Monday</li>
      <li>Tuesday</li>
      <li>Wednesday</li>
      <li>Thursday</li>
    </ul>
  </li>
  <li><strong>Time Slots per Day</strong>:
    <ul>
      <li>Slot 1: 08:00 – 10:00</li>
      <li>Slot 2: 10:00 – 12:00</li>
      <li>Slot 3: 13:00 – 15:00</li>
      <li>Slot 4: 15:00 – 17:00</li>
    </ul>
  </li>
</ul>

<h2>Constraints</h2>

<p>The schedule generation process considers the following constraints to ensure feasibility:</p>

<ol>
  <li><strong>Teacher Availability</strong>: Teachers have specific availability on certain days and time slots. The algorithm ensures that classes are assigned only during times when the teacher is available.</li>
  <li><strong>Room Capacity</strong>: Each room has a fixed capacity, and the group size must not exceed this capacity to avoid overcrowding.</li>
  <li><strong>Room Proximity</strong>: When consecutive classes are scheduled for the same group, the algorithm minimizes the walking distance between classrooms, ensuring a convenient flow between sessions.</li>
  <li><strong>Module Overlap</strong>: No group should have two different lessons scheduled at the same time. The algorithm ensures there are no overlapping classes for the same group.</li>
  <li><strong>Teacher Mobility Constraints</strong>: Teachers with mobility issues (e.g., those who cannot use stairs) are only assigned rooms on accessible floors.</li>
  <li><strong>Room Availability</strong>: The algorithm ensures that rooms are available and not double-booked during the assigned time slots.</li>
</ol>

<h2>Genetic Algorithm Overview</h2>

<h3>Variables</h3>
<ul>
  <li><strong>days</strong>: [Sunday, Monday, Tuesday, Wednesday, Thursday]</li>
  <li><strong>time_slots</strong>: ["08:00-10:00", "10:00-12:00", "13:00-15:00", "15:00-17:00"]</li>
  <li><strong>teachers</strong>: A dictionary where each teacher has defined availability, mobility constraints, etc.</li>
  <li><strong>rooms</strong>: A dictionary where each room has capacity, location, and availability details.</li>
  <li><strong>groups</strong>: A dictionary where each group is enrolled in specific courses.</li>
  <li><strong>courses</strong>: A dictionary where each course has an assigned group, teacher, and room requirement.</li>
</ul>

<h3>Constraints</h3>
<ul>
  <li><strong>Teacher Availability</strong>: Assign classes only to time slots when the teacher is available.</li>
  <li><strong>Room Capacity</strong>: Assign rooms with sufficient capacity for the group size.</li>
  <li><strong>Room Proximity</strong>: Minimize walking distance between consecutive classes for the same group.</li>
  <li><strong>Module Overlap</strong>: Ensure no two classes for the same group are assigned in the same time slot.</li>
  <li><strong>Teacher Mobility</strong>: Ensure teachers with mobility constraints are assigned accessible rooms.</li>
  <li><strong>Room Availability</strong>: Ensure rooms are available during the assigned time slot.</li>
</ul>

<h3>Optimization Goal</h3>
<p>The genetic algorithm optimizes the schedule by iterating through possible combinations of rooms, time slots, and groups while minimizing conflicts and satisfying the constraints outlined above.</p>

