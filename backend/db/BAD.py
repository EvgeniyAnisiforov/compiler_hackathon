import sqlite3
import platform

DB_NAME = "DBStandart.db"



class CurUser:
    def __init__(self, userID):
        self.__userID = userID
        self.__db = sqlite3.connect(DB_NAME)
        self.__c = self.__db.cursor()
        self.UpdateAtrb()

    def UpdateAtrb(self):
        self.__db.commit()
        self.__attribute = self.__c.execute(f"""SELECT login, passwd, name, surname,
                last_code, lang, RAM, time, thema_color FROM Users  
                LEFT JOIN AllSettings USING(userID) WHERE userID = {self.__userID} """).fetchone()

    def GetAtrb(self):
        print(self.__attribute)
        return self.__attribute

    def SetVebAtrb(self, last_code, RAM, time, lang=None, thema_color=None):
        if lang is None: lang = self.__attribute[5]
        if thema_color is None: thema_color = self.__attribute[8]

        self.__c.execute("""UPDATE AllSettings SET 
                            last_code = ?, lang = ?, RAM = ?, time = ?, thema_color = ?
                            WHERE userID = ?""",
                         (last_code, lang, RAM, time, thema_color, self.__userID))

        self.UpdateAtrb()
        print(self.GetAtrb())

    def SetAtrb(self, login=None, passwd=None, name=None, surname=None):
        if login is None: login = self.__attribute[0]
        if passwd is None: passwd = self.__attribute[1]
        if name is None: name = self.__attribute[2]
        if surname is None: surname = self.__attribute[3]

        self.__c.execute("""UPDATE Users SET login = ?, passwd = ?, name = ?, surname = ?
                            WHERE userID = ?""",
                         (login, passwd, name, surname, self.__userID))

        self.UpdateAtrb()
        print(self.GetAtrb())


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
            RAM REAL,
            time REAL,
            thema_color TEXT DEFAULT '#rgb',
            FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
            )""")
        db.commit()


def CreateUser(login, passwd, name, surname):
    with sqlite3.connect(DB_NAME) as db:
        userID = db.execute("SELECT userID FROM Users WHERE login = ?", (login,)).fetchone()
        if userID is not None:
            return None

        db.execute('BEGIN TRANSACTION')
        db.execute("INSERT INTO Users (login, passwd, name, surname) VALUES (?, ?, ?, ?)",
                   (login, passwd, name, surname))
        userID = db.execute("SELECT last_insert_rowid()").fetchone()[0]
        db.execute("INSERT INTO AllSettings (userID) VALUES (?)", (userID,))
        db.execute('COMMIT')
        db.commit()

        return CurUser(userID)


def CheckUser(login, passwd):
    with sqlite3.connect(DB_NAME) as db:
        query = "SELECT userID FROM Users WHERE login = ? AND passwd = ?"
        userID = db.execute(query, (login, passwd)).fetchone()
        if userID is None:
            return None

        return CurUser(userID[0])


# Тестирование
Create_DB()
curUser = CreateUser("8", "5", "oo", "oo") or CheckUser("8", "5")
curUser.SetVebAtrb("6", 7, 8, 9,10)
print('hi')
