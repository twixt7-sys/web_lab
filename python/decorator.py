def decorator(f):
    def wrapper():
        print("before")
        f()
        print("after")
    return wrapper

@decorator
def func():
    print("inside func")

func()