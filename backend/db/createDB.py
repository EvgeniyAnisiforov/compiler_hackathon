import sqlite3


class DB:
    def __init__(self):
        self.__db = sqlite3.connect('./DBStandart.db')
        self.__c = self.__db.cursor()
        
        self.__c.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = self.__c.fetchall()
        tables_name = [table[0] for table in tables]
        if (len(tables_name) <3):

            for i in range(0, len(tables_name)):
                 self.__c.execute(f"DROP TABLE {tables_name[i]}")
                 self.__db.commit()
                 
            self.__c.execute("""CREATE TABLE Users (
          userID INTEGER PRIMARY KEY AUTOINCREMENT,
          login TEXT NOT NULL,
          passwd TEXT NOT NULL
          )
            """)
            self.__c.execute("""CREATE TABLE LastReguest (
          userID INTEGER PRIMARY KEY AUTOINCREMENT,
          code TEXT,
          RAM TEXT,
          time REAL,
          laung VARCHAR(3),
          FOREIGN KEY (userID)  REFERENCES  Users(userID)  ON DELETE CASCADE    
          )""")

    #регистрация
    def CreateUser(self, login, passwd):
        #проверка на совпадение
        if (not(self.Register(login,passwd))):
            return False
        query =("INSERT INTO Users(login, passwd) VALUES(?, ?)")
        self.__c.execute(query, (login,passwd))
        print(self.__c.execute("SELECT * FROM Users").fetchall())
        self.__db.commit()
        return True
    #авторизация
    def Register(self, login, passwd):
        query= ("SELECT userID FROM Users WHERE login = ? AND passwd = ?")
        self.__c.execute(query, (login,passwd))
        res = self.__c.fetchall()
        if (len(res) == 0):
            return False
        else:
            return True
        
db = DB()
db.CreateUser("root", "0000")
db.Register("roou","0000")
#db.__c.execute("SELECT * FROM Users")

 




# c.execute ("INSERT INTO Users(login, passwd) VALUES(root, passwd) ")
# c.execute("SELECT * FROM Users")
#db.commit()
#db.close()