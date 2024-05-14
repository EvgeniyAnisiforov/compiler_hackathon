import sqlite3


class DB:
    def __init__(self):
        self.__db = sqlite3.connect('DBStandart.db')
        self.__c = self.__db.cursor()
        
        self.__c.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = self.__c.fetchall()
        tables_name = [table[0] for table in tables]
        if (len(tables_name) <3):
            self.__c.execute("""CREATE TABLE Users (
          userID INTEGER PRIMARY KEY AUTOINCREMENT,
          login TEXT NOT NULL,
          passwd TEXT NOT NULL,
          code TEXT,
          lang VARCHAR(3)
          )
            """)
            self.__c.execute("""CREATE TABLE LastReguest (
          userID INTEGER PRIMARY KEY AUTOINCREMENT,
          code TEXT,
          RAM TEXT,
          Watch INTEGER
          )""")
    
        

        
db = DB()
 




# c.execute ("INSERT INTO Users(login, passwd) VALUES(root, passwd) ")
# c.execute("SELECT * FROM Users")
# db.commit()
# db.close()