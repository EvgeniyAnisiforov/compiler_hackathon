import sqlite3

DB_NAME = "../../DBStandart.db"


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
def CreateUser(login, passwd, name, surname):
    with sqlite3.connect(DB_NAME) as db:
        if db.execute("SELECT userID FROM Users WHERE login = ?", (login,)).fetchone() is not None:
            return False
        db.execute("INSERT INTO Users (login, passwd, name, surname) VALUES (?, ?, ?, ?)",
                   (login, passwd, name, surname))
        userID = db.execute("SELECT last_insert_rowid()").fetchone()[0]
        db.execute("INSERT INTO AllSettings (userID) VALUES (?)", (userID,))
        return True


def CheckUser(login, passwd):
    with sqlite3.connect(DB_NAME) as db:
        user = db.execute("SELECT userID, name, surname FROM Users WHERE login = ? AND passwd = ?",
                          (login, passwd)).fetchone()
        if user:
            return {"userID": user[0], "name": user[1], "surname": user[2]}
        return False


# Получить атрибуты пользователя
def GetAtrb(userID, *args):
    with sqlite3.connect(DB_NAME) as db:
        if not args:
            return db.execute("SELECT * FROM Users LEFT JOIN AllSettings USING(userID) WHERE userID = ?",
                              (userID,)).fetchone()
        fields = ', '.join([arg for arg in args if
                            arg in ["login", "passwd", "name", "surname", "last_code", "lang", "RAM", "time_python",
                                    "time_java", "time_cpp", "time_js"]])
        if not fields:
            return False
        return list(db.execute(f"SELECT {fields} FROM Users LEFT JOIN AllSettings USING(userID) WHERE userID = ?",
                               (userID,)).fetchone())


# Обновить атрибуты пользователя
def SetAtrb(userID, **kwargs):
    with sqlite3.connect(DB_NAME) as db:
        user_settings = db.execute("SELECT login, passwd, name, surname, last_code, lang, RAM, time_python, "
                                   "time_java, time_cpp, time_js FROM Users LEFT JOIN AllSettings USING(userID) WHERE"
                                   " userID = ?", (userID,)).fetchone()
        updated_settings = [kwargs.get(field, current) for field, current in
                            zip(["login", "passwd", "name", "surname", "last_code", "lang", "RAM", "time_python",
                                 "time_java", "time_cpp", "time_js"], user_settings)]
        db.execute("UPDATE Users SET login = ?, passwd = ?, name = ?, surname = ? WHERE userID = ?",
                   updated_settings[:4] + [userID])
        db.execute("UPDATE AllSettings SET last_code = ?, lang = ?, RAM = ?, time_python = ?, time_java = ?, "
                   "time_cpp = ?, time_js = ? WHERE userID = ?", updated_settings[4:] + [userID])
        db.commit()
        return True




# Создание базы данных и таблиц
Create_DB()

# Добавление пользователей
CreateUser("user1", "password1", "John", "Doe")
CreateUser("user2", "password2", "Jane", "Smith")
CreateUser("user3", "password3", "Alice", "Johnson")

# Добавление настроек для каждого пользователя
# Это пример того, как вы можете добавлять или изменять настройки
userID1 = CheckUser("user1", "password1")['userID']
userID2 = CheckUser("user2", "password2")['userID']
userID3 = CheckUser("user3", "password3")['userID']

SetAtrb(userID1, last_code="print('Hello, world!')", lang="python", RAM=512, time_python=1.5, time_java=0.0, time_cpp=0.0, time_js=0.0)
SetAtrb(userID2, last_code="System.out.println('Hello, world!');", lang="java", RAM=1024, time_python=0.0, time_java=2.0, time_cpp=0.0, time_js=0.0)
SetAtrb(userID3, last_code="#include <iostream>\nint main() { std::cout << 'Hello, world!'; return 0; }", lang="cpp", RAM=2048, time_python=0.0, time_java=0.0, time_cpp=3.5, time_js=0.0)

# Проверка добавленных данных
print(GetAtrb(userID1, "last_code", "lang", "RAM", "time_python", "time_java", "time_cpp", "time_js"))
print(GetAtrb(userID2, "last_code", "lang", "RAM", "time_python", "time_java", "time_cpp", "time_js"))
print(GetAtrb(userID3, "last_code", "lang", "RAM", "time_python", "time_java", "time_cpp", "time_js"))
