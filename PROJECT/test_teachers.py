from webapp.app import app, get_teachers
import sys

with app.test_request_context():
    teachers = get_teachers()
    print(f"Number of teachers: {len(teachers)}")
    if teachers:
        for i, teacher in enumerate(teachers[:5]):
            print(f"Teacher {i+1}: ID={teacher.id}, Name={teacher.name}, Subject={teacher.subject}")
    else:
        print("No teachers returned by get_teachers()")
