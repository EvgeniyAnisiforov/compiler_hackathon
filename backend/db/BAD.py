import aiosqlite
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
async def Create_DB():
    async with aiosqlite.connect(DB_NAME) as db:
        await db.execute("""CREATE TABLE IF NOT EXISTS Users (
            userID INTEGER PRIMARY KEY AUTOINCREMENT,
            login VARCHAR(255) NOT NULL,
            passwd VARCHAR(255) NOT NULL,
            name VARCHAR(255),
            surname VARCHAR(255))""")
        await db.execute("""CREATE TABLE IF NOT EXISTS AllSettings(
            userID PRIMARY KEY,
            last_code TEXT,
            lang TEXT CHECK( lang IN ('Cpp','Java','JavaScript','Python') ) NOT NULL,
            RAM REAL,
            time REAL,
            thema_color CHECK(thema_color IN ('#000000','#FFFFFF','#rgb')) NOT NULL DEFAULT '#rgb',
            FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
            )""")
        await db.commit()

#регистрация
async def CreateUser(login,passwd,name,surname):
    async with aiosqlite.connect(DB_NAME) as db:        
        query= ("SELECT userID FROM Users WHERE login = ?")
        userID = await db.execute_fetchall(query,(login))
        if(len(userID) != 0): 
            print( await db.execute_fetchall("SELECT * FROM Users WHERE login = ?",login))
            return None
        await db.execute("INSERT INTO Users(login,passwd,name,surname) VALUES(?,?,?,?)",(login,passwd,name,surname))      
        print( await db.execute_fetchall("SELECT * FROM Users WHERE login = ?",login))
        cur_user = CurUser()
        await db.commit()
        return cur_user
    

#авторизация
async def CheckUser(login, passwd):
    async with aiosqlite.connect(DB_NAME) as db:        
        query= ("SELECT userID FROM Users WHERE login = ? AND passwd = ?")
        userID = await db.execute_fetchall(query,(login,passwd))
        if(len(userID) == 0): 
            return None
        cur_user = CurUser()
        return cur_user
    
#важный класс нужен конструктор
class CurUser:
    def smth():
        print("help")



#тестирование
async def main():
    task_1 = asyncio.create_task(Create_DB())
    task_2 =asyncio.create_task(CreateUser("9","9","9","9"))
    await task_1
    await task_2
asyncio.run(main())


# db = DB()
# db.CreateUser("root", "0000")
# db.Register("roou","0000")
#db.__c.execute("SELECT * FROM Users")






# c.execute ("INSERT INTO Users(login, passwd) VALUES(root, passwd) ")
# c.execute("SELECT * FROM Users")
#db.commit()
#db.close()