import sqlite3


DB_NAME = "../../DBStandart.db"

#очевидно и невероятно
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
            lang TEXT CHECK( lang IN ('Cpp','Java','JavaScript','Python') ) DEFAULT NULL,
            RAM INTEGER,
            time REAL,
            thema_color CHECK(thema_color IN ('#000000','#FFFFFF','#rgb')) DEFAULT '#000000',
            FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
            )""")
        db.commit()

#регистрация 
def CreateUser(login, passwd, name, surname):
    with sqlite3.connect(DB_NAME) as db:
        query = "SELECT userID FROM Users WHERE login = ?"
        query_exe = db.execute(query, (login,)).fetchone()
        if query_exe is not None:
            return False
        db.execute('BEGIN TRANSACTION')
        db.execute("INSERT INTO Users (login, passwd, name, surname) VALUES (?, ?, ?, ?)",
                   (login, passwd, name, surname))
        userID = db.execute("SELECT last_insert_rowid()").fetchone()[0]
        db.execute("INSERT INTO AllSettings (userID) VALUES (?)", (userID,))
        db.execute('COMMIT')
        db.commit()
        return True

#авторизация вариант 1
def CheckUser(login, passwd):
    with sqlite3.connect(DB_NAME) as db:
        query = "SELECT userID,name,surname FROM Users WHERE login = ? AND passwd = ?"
        query_exe = db.execute(query, (login, passwd)).fetchone()
        if query_exe is None:
            return False
        return query_exe

#Получить все/определенные значения атрибутов в виде списка (спросить у Ильи как добавить подсказку)
def GetAtrb(userID, *args):
    with sqlite3.connect(DB_NAME) as db:
        if len(args) == 0 : 
            return db.execute("""SELECT login, passwd, name, surname,
                last_code, lang, RAM, time, thema_color FROM Users  
                LEFT JOIN AllSettings USING(userID) WHERE userID = ?""",(userID,)).fetchone() 
        str_for_query=""
        for a in args:
            if a in ["login","passwd","name","surname","last_code","RAM","time","thema_color"]:      
                str_for_query+= a + ','
            else: return False 

        return list(db.execute(f"SELECT {str_for_query[:-1]} FROM USERS \
                        LEFT JOIN AllSettings USING(userID) WHERE userID = {userID}").fetchone())
                
#Изменить значения атрибута/ов
def SetAtrb(userID ,login=None, passwd=None, name=None, surname=None,
                last_code=None, lang=None, RAM=None, time=None, thema_color=None):
    with sqlite3.connect(DB_NAME) as db:
        atrbs = list(db.execute("""SELECT login, passwd, name, surname,
                last_code, lang, RAM, time, thema_color FROM Users  
                LEFT JOIN AllSettings USING(userID) WHERE userID = ?""",(userID,)).fetchone() )
        c=0
        for i in [login,passwd,name,surname,last_code, lang, RAM, time, thema_color]:
            if i is not None: atrbs[c] = i
            c+=1
        db.execute("""UPDATE Users SET login = ?, passwd = ?, name = ?, surname = ?
                            WHERE userID = ?""",
                         (atrbs[0], atrbs[1], atrbs[2], atrbs[3], userID))
        db.execute("""UPDATE AllSettings SET 
                            last_code = ?, lang = ?, RAM = ?, time = ?, thema_color = ?
                            WHERE userID = ?""",
                         (atrbs[4], atrbs[5], atrbs[6], atrbs[7], atrbs[8], userID))
        db.commit()
        print(db.execute("""SELECT login, passwd, name, surname,
                last_code, lang, RAM, time, thema_color FROM Users  
                LEFT JOIN AllSettings USING(userID) WHERE userID = ?""",(userID,)).fetchone() )
        
                
         




    
        
# Тестирование
# Create_DB()
# CreateUser("8", "5", "oo", "oo") or CheckUser("8", "5")
# GetAtrb(1, "name", "RAM","yy")
SetAtrb(1,last_code="tratata",name="fun",thema_color="#rgb")
print(GetAtrb(1))
