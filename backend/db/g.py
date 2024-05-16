
def f(a,*pargs,**kargs):
    print(a,pargs,kargs,sep=", ")
f(1,2,3,x=4,y=5)