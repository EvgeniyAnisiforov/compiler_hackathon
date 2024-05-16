import aiosqlite
import sqlite3
import asyncio
import platform

if platform.system()=='Windows':
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
DB_NAME = "DBStandart.db"
#создать аккаунт
#при регестрации верну пользователя со всеми полями 
#нет при авто и рег верну обьект класса пусть работает с ним
#может понадобиться таблица со статистикой/
#при отправку кода компилятору нужно обновить code
#по завершению работы нужно обновить RAM AND TIME
# не забудь закрыть соединение с бд в деструкторе
#если что то не работает в createbd добавь курсор
#важный класс нужен конструктор
class CurUser:
    def __init__(self,userID):
        self.__userID = userID
        self.__db = sqlite3.connect(DB_NAME)
        self.__c = self.__db.cursor()
        self.UpdateAtrb()
        
    
    def UpdateAtrb(self):
        self.__db.commit()
        self.__attribute = self.__c.execute(f"""SELECT userID, login, passwd,name,surname,
                last_code,lang, RAM, time, thema_color FROM Users  
                LEFT JOIN AllSettings ON Users.userID = userID WHERE AllSettings.userID  = {self.__userID} """).fetchone()
        
        #print(self.__attribute)

    def GetAtrb(self):
        print (self.__attribute)
        return self.__attribute
    
    def SetVebAtrb(self, last_code, RAM, time, lang=None,thema_color=None):
        if (lang == None): lang = self.__attribute[5]
        if (thema_color == None): thema_color = self.__attribute[8]
        self.__c.execute("""UPDATE AllSettings SET 
            last_code=?,lang=?, RAM=?, time=?, thema_color=? WHERE userID= ?""",(last_code, lang,RAM, time, thema_color,self.__userID))
        
        self.UpdateAtrb()

        print(self.GetAtrb())
        
    def SetAtrb(self,login = None, passwd = None, name = None,surname = None):
        if (login == None): login = self.__attribute[0]
        if (passwd == None): passwd = self.__attribute[1]
        if (name == None): name = self.__attribute[2]
        if (surname == None): surname = self.__attribute[3]
        self.__c.execute("""UPDATE Users SET login =?,passwd=?,name=?,surname=?
                          WHERE userID = ?""",(login, passwd,name,surname,self.__userID))
        
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
            userID PRIMARY KEY,
            last_code TEXT,
            lang TEXT DEFAULT NULL,
            RAM REAL,
            time REAL,
            thema_color TEXT DEFAULT '#rgb',
            FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
            )""")
        db.commit()

#регистрация
def CreateUser(login, passwd, name, surname):
    with sqlite3.connect(DB_NAME) as db: 
                 
        userID = db.execute(f"SELECT userID FROM Users WHERE login = {login}").fetchone()
        if(userID != None): 
            #print( await db.execute_fetchall("SELECT * FROM Users WHERE login = ?",login))
            return None

        db.execute('BEGIN TRANSACTION') 
        db.execute("INSERT INTO Users(login,passwd,name,surname) VALUES(?,?,?,?)",(login,passwd,name,surname))      
        userID = db.execute("SELECT last_insert_rowid()").fetchall()
        #print(userID[0][0])
        #print( await db.execute_fetchall("SELECT * FROM Users WHERE login = ?",login))
        db.execute('COMMIT') 
        db.commit()
        cur_user = CurUser(userID[0][0])
        print(db.execute(f"SELECT userID FROM Users WHERE login = {login}").fetchone())
        return cur_user
    

#авторизация
def CheckUser(login, passwd):
    with sqlite3.connect(DB_NAME) as db:        
        query= ("SELECT userID FROM Users WHERE login = ? AND passwd = ?")
        #print(db.execute("SELECT * FROM Users").fetchall())
        userID = db.execute(query,(login,passwd)).fetchall()
        if(len(userID) == 0): 
            return None
        cur_user = CurUser(userID[0][0])
        #print(userID[0][0])
        return cur_user
    
 
    


#тестирование

    
    
#Create_DB()
#curUser = CreateUser("8","6","oo","oo")
curUser = CheckUser("8","5")

curUser.SetAtrb("8","5")


# db = DB()
# db.CreateUser("root", "0000")
# db.Register("roou","0000")
#db.__c.execute("SELECT * FROM Users")






# c.execute ("INSERT INTO Users(login, passwd) VALUES(root, passwd) ")
# c.execute("SELECT * FROM Users")
#db.commit()
#db.close()