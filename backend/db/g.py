
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