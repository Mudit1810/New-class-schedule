
# Class Schedule Application

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Python](https://img.shields.io/badge/python-3.8+-green)
![Flask](https://img.shields.io/badge/flask-2.0+-yellow)
![License](https://img.shields.io/badge/license-MIT-orange)

A comprehensive web-based class scheduling system for educational institutions. The application features drag-and-drop timetable management, conflict detection, and an intuitive interface for administrators and teachers.

<p align="center">
  <img src="https://via.placeholder.com/800x450.png?text=Class+Scheduling+System" alt="Class Schedule Application Screenshot" width="80%">
</p>

## 🌟 Key Features

### Core Functionality
- **Interactive Drag-and-Drop Timetable**: Easily arrange classes with visual feedback
- **Automatic Conflict Detection**: Prevent scheduling conflicts for rooms and teachers
- **Smart Conflict Resolution**: Get intelligent suggestions when conflicts occur
- **Multi-View Timetables**: Access class group and teacher-specific schedules

### Advanced Features
- **Resource Management**: Comprehensive classroom and teaching staff organization
- **Analytics Dashboard**: Visual insights into resource utilization and teaching loads
- **Role-Based Access**: Customized views for administrators and teachers
- **Bulk Data Import**: Quick setup with CSV imports for all entity types
- **Theme Support**: Modern UI with light/dark mode toggle

## 🚀 Getting Started

### Prerequisites
- Python 3.8 or higher
- pip package manager
- Modern web browser with JavaScript enabled

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aaryanug25-tech/class-schedule.git
   cd class-schedule
   ```

2. Install dependencies:
   ```bash
   python3 -m pip install flask sqlalchemy markupsafe
   ```

### Running the Application

#### Option 1: Using the start script (Recommended)
```bash
./start_server.sh
```

#### Option 2: Manual startup
```bash
cd PROJECT
python3 webapp/app.py
```

#### Option 3: Using Flask CLI
```bash
cd PROJECT
export FLASK_APP=webapp/app.py
flask run --port 8081
```

The application will be available at [http://localhost:8081](http://localhost:8081)

## 💻 Usage Guide

### Initial Setup
1. **Add Resources**: Create classrooms, courses, teachers, and class groups
2. **Assign Teachers**: Link teachers to specific courses for each class group
3. **Generate Timetable**: Create an initial schedule with automatic conflict avoidance

### Timetable Management
1. **Drag-and-Drop Adjustments**: Rearrange classes by dragging them to new timeslots
2. **Conflict Resolution**: When conflicts occur, review suggestions and resolve them
3. **Room Management**: Find available rooms or reschedule classes as needed

### Advanced Operations
- Access teacher workload statistics via the analytics dashboard
- Review room utilization patterns to optimize space usage
- Approve and finalize timetables with the approval system
- Export timetables for sharing or printing

## 📊 Data Import Format (CSV)

### Classroom CSV
```csv
name,capacity
Room 101,30
Room 102,40
```

### Teacher CSV
```csv
name,subject
Jane Doe,Mathematics
John Smith,Physics
```

### Course CSV
```csv
name
Calculus I
Physics II
```

### Class Group CSV
```csv
name
CSE-A
ECE-B
```

## 🧩 Technical Architecture

### Tech Stack
- **Backend**: Python 3 with Flask framework
- **Database**: SQLite with SQLAlchemy ORM
- **Frontend**: HTML5, CSS3, JavaScript
- **Templating**: Jinja2
- **UI Components**: Chart.js for analytics, custom drag-and-drop implementation
- **Styling**: Modern GitHub-inspired theme with light/dark mode

### Project Structure
```
PROJECT/
├── models.py              # Database models and relationships
├── scheduler.py           # Core scheduling algorithms and logic
├── scheduler_update.py    # Scheduler maintenance and updates
├── config.py              # Application configuration
├── webapp/
│   ├── app.py             # Flask application with relative imports
│   ├── templates/         # HTML templates with Jinja2
│   └── static/            # Frontend assets (JS, CSS, images)
├── scheduler.db           # SQLite database (auto-created)
└── start_server.sh        # Convenience script for starting the app
```

## ⚙️ Implementation Details

### Path Management
- Uses relative paths throughout the codebase for maximum portability
- Easy deployment across different environments and operating systems

### Scheduling Algorithm
- Constraint-based scheduling with conflict detection
- Optimization for teacher workload distribution
- Room assignment based on capacity and availability

### User Interface
- Responsive design that works on desktop and tablet devices
- Interactive elements with real-time feedback
- Clear visual indicators for conflicts and resolutions

## 📚 References and Research Materials

### Academic Papers and Research
#### University Course Timetabling
- [A Comprehensive Survey of Educational Timetabling](https://doi.org/10.1007/s10951-021-00691-w)
- [Recent Developments in University Timetabling](https://link.springer.com/chapter/10.1007/978-3-540-77345-0_1)
- [A Graph-Based Hyper-Heuristic for Educational Timetabling Problems](https://www.sciencedirect.com/science/article/abs/pii/S0377221711007296)

#### Optimization Algorithms
- [Simulated Annealing: A Component-Based Analysis](https://www.sciencedirect.com/science/article/abs/pii/S0305054818303277)
- [A Comparison of Genetic Algorithms and Simulated Annealing in University Timetabling Problems](https://ieeexplore.ieee.org/document/6215042)
- [Tabu Search for University Course Timetabling](https://doi.org/10.1007/s10951-005-4507-y)

#### Constraint Satisfaction Problems
- [Constraint-Based Scheduling in Education](https://www.sciencedirect.com/science/article/abs/pii/S0377221707010077)
- [Integer Programming Models for Class Scheduling](https://pubsonline.informs.org/doi/abs/10.1287/opre.48.5.700.12392)

### Technical Resources
- [Flask Documentation](https://flask.palletsprojects.com/)
- [SQLAlchemy ORM Tutorial](https://docs.sqlalchemy.org/en/14/orm/tutorial.html)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
- [Python Path Management](https://docs.python.org/3/tutorial/modules.html#the-module-search-path)
- [Relative vs. Absolute Imports in Python](https://realpython.com/absolute-vs-relative-python-imports/)

### Timetabling Software and Libraries
- [FET Free Timetabling Software](https://lalescu.ro/liviu/fet/)
- [UniTime](https://www.unitime.org/)
- [OpenTimetabler](https://github.com/UniversityOfPlymouth-Electronics/open-timetabler)
- [Google OR-Tools](https://developers.google.com/optimization)
- [OptaPlanner](https://www.optaplanner.org/)

## 🛠 Development Notes

- To start fresh, delete `scheduler.db` and restart the app
- The drag-and-drop interface requires a modern browser with HTML5 support
- Real-time conflict detection prevents scheduling errors during manual adjustments
- Smart suggestion system uses heuristics to find optimal alternative slots

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
