#мусоропровод
def f(a,*pargs,**kargs):
    print(a,pargs,kargs,sep=", ")


def clar():
    ggg = gg(5)
    return ggg
class gg:
    def __init__(self, g):
        self.__c = g
    def Get(self):
        print (self.__c)

fi =clar()
fi.Get()
db.execute("""CREATE TABLE IF NOT EXISTS AllSettings(
            userID PRIMARY KEY,
            last_code TEXT,
            lang TEXT CHECK( lang IN ('Cpp','Java','JavaScript','Python') ) DEFAULT NULL,
            RAM REAL,
            time REAL,
            thema_color TEXT CHECK(thema_color IN ('#000000','#FFFFFF','#rgb')) DEFAULT '#rgb',
            FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
            )""")

# class CurUser:
#     def __init__(self, userID):
#         self.__userID = userID
#         self.__db = sqlite3.connect(DB_NAME)
#         self.__c = self.__db.cursor()
#         self.UpdateAtrb()

    

#     def GetAtrb(self):
#         print(self.__attribute)
#         return self.__attribute

#     def SetVebAtrb(self, last_code, RAM, time, lang=None, thema_color=None):
#         if lang is None: lang = self.__attribute[5]
#         if thema_color is None: thema_color = self.__attribute[8]

#         self.__c.execute("""UPDATE AllSettings SET 
#                             last_code = ?, lang = ?, RAM = ?, time = ?, thema_color = ?
#                             WHERE userID = ?""",
#                          (last_code, lang, RAM, time, thema_color, self.__userID))

#         self.UpdateAtrb()
#         print(self.GetAtrb())

#     def SetAtrb(self, login=None, passwd=None, name=None, surname=None):
#         if login is None: login = self.__attribute[0]
#         if passwd is None: passwd = self.__attribute[1]
#         if name is None: name = self.__attribute[2]
#         if surname is None: surname = self.__attribute[3]

#         self.__c.execute("""UPDATE Users SET login = ?, passwd = ?, name = ?, surname = ?
#                             WHERE userID = ?""",
#                          (login, passwd, name, surname, self.__userID))

#         self.UpdateAtrb()
#         print(self.GetAtrb())