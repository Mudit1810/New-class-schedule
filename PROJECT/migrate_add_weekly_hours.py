import sqlite3
import os

# Path to the SQLite database
DB_PATH = 'scheduler.db'

def add_weekly_hours_column():
    """Add weekly_hours column to teachers table"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Check if the column already exists
    cursor.execute("PRAGMA table_info(teachers)")
    columns = cursor.fetchall()
    column_names = [column[1] for column in columns]
    
    if 'weekly_hours' not in column_names:
        print("Adding weekly_hours column to teachers table...")
        # Add the weekly_hours column with default value 8
        cursor.execute("ALTER TABLE teachers ADD COLUMN weekly_hours INTEGER DEFAULT 8")
        conn.commit()
        print("Column added successfully!")
    else:
        print("weekly_hours column already exists in teachers table.")
    
    # Verify the column exists now
    cursor.execute("PRAGMA table_info(teachers)")
    columns = cursor.fetchall()
    column_names = [column[1] for column in columns]
    print(f"Current columns in teachers table: {column_names}")
    
    conn.close()

if __name__ == "__main__":
    add_weekly_hours_column()
