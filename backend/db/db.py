import os
import sqlite3

DB_NAME = os.path.join(os.path.dirname(__file__), '../DBStandart.db')


# Создание таблиц
def Create_DB():
    with sqlite3.connect(DB_NAME) as db:
        db.execute("""CREATE TABLE IF NOT EXISTS Users (
            userID INTEGER PRIMARY KEY AUTOINCREMENT,
            login VARCHAR(255) NOT NULL,
            passwd VARCHAR(255) NOT NULL,
            name VARCHAR(255),
            surname VARCHAR(255))""")
        db.execute("""CREATE TABLE IF NOT EXISTS AllSettings(
            userID INTEGER PRIMARY KEY,
            last_code TEXT,
            lang TEXT DEFAULT NULL,
            RAM INTEGER,
            time_python REAL DEFAULT 0,
            time_java REAL DEFAULT 0,
            time_cpp REAL DEFAULT 0,
            time_js REAL DEFAULT 0,
            FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
            )""")
        db.commit()


# Регистрация пользователя
def CreateUser(login: str, passwd: str, name: str, surname: str):
    with sqlite3.connect(DB_NAME) as db:
        if db.execute("SELECT userID FROM Users WHERE login = ?", (login,)).fetchone() is not None:
            return False
        db.execute("INSERT INTO Users (login, passwd, name, surname) VALUES (?, ?, ?, ?)",
                   (login, passwd, name, surname))
        userID = db.execute("SELECT last_insert_rowid()").fetchone()[0]
        db.execute("INSERT INTO AllSettings (userID) VALUES (?)", (userID,))
        return True


# Авторизация
def CheckUser(login: str, passwd: str):
    with sqlite3.connect(DB_NAME) as db:
        user = db.execute("SELECT userID, name, surname FROM Users WHERE login = ? AND passwd = ?",
                          (login, passwd)).fetchone()
        if user:
            return {"userID": user[0], "name": user[1], "surname": user[2]}
        return False


# Получить атрибуты пользователя
def GetAtrb(userID: int, *args):
    with sqlite3.connect(DB_NAME) as db:
        if not args:
            result = db.execute("SELECT * FROM Users LEFT JOIN AllSettings USING(userID) WHERE userID = ?",
                                (userID,)).fetchone()
        else:
            fields = ', '.join(arg for arg in args if
                               arg in ["login", "passwd", "name", "surname", "last_code", "lang", "RAM", "time_python",
                                       "time_java", "time_cpp", "time_js"])
            if not fields:
                return []
            result = db.execute(f"SELECT {fields} FROM Users LEFT JOIN AllSettings USING(userID) WHERE userID = ?",
                                (userID,)).fetchone()

        return list(result) if result else []


# Обновить атрибуты пользователя
def SetAtrb(userID: int, **kwargs):
    with sqlite3.connect(DB_NAME) as db:
        # First check if the user exists
        user_exists = db.execute("SELECT 1 FROM Users WHERE userID = ?", (userID,)).fetchone()
        if not user_exists:
            return False

        user_settings = db.execute(
            "SELECT login, passwd, name, surname, last_code, lang, RAM, time_python, time_java, time_cpp, "
            "time_js FROM Users LEFT JOIN AllSettings USING(userID) WHERE userID = ?",
            (userID,)).fetchone()
        if not user_settings:
            return False

        updated_settings = [kwargs.get(field, current) for field, current in
                            zip(["login", "passwd", "name", "surname", "last_code", "lang", "RAM", "time_python",
                                 "time_java", "time_cpp", "time_js"], user_settings)]

        # Perform the update in Users table
        db.execute("UPDATE Users SET login = ?, passwd = ?, name = ?, surname = ? WHERE userID = ?",
                   updated_settings[:4] + [userID])

        db.execute(
            "UPDATE AllSettings SET last_code = ?, lang = ?, RAM = ?, time_python = ?, time_java = ?, time_cpp = ?, "
            "time_js = ? WHERE userID = ?",
            updated_settings[4:] + [userID])
        db.commit()
        return True


def delete_user_from_db_by_login(login: str):
    with sqlite3.connect(DB_NAME) as conn:
        cur = conn.cursor()
        cur.execute("SELECT userID FROM Users WHERE login = ?", (login,))
        user_id = cur.fetchone()
        if user_id is None:
            return False

        cur.execute("DELETE FROM AllSettings WHERE userID = ?", (user_id[0],))

        cur.execute("DELETE FROM Users WHERE login = ?", (login,))
        if cur.rowcount == 0:
            return False

        conn.commit()
        return True
