import numpy as np

Demand = [100,100,50,50,210, 100, 150, 140, 30, 40, 170, 0, 40, 10, 150]
N = len(Demand)
A = 50
h = 0.5


def k(i,j): #Ki,j 구하기
    t = 0
    sum = 0
    if i <= j:
        while t <= j-i:
            sum += t*Demand[i+t-1]*h
            t += 1
        result = A + sum
    else:
        result = None
    return result


def klist(x): #Ki,j 행렬
    list = []
    n = 1
    while n <= x:
        m = 1
        while m <= x:
            list.append(k(n,m))
            m += 1
        n += 1
        arr = np.array(list)
    return arr.reshape(n-1,x)


def minelements(Y): #min값의 index를 모두 불러오기
    min_indices = []
    if Y:
        min_val = Y[0]
        for i,val in ((i,val) for i,val in enumerate(Y) if val <= min_val):
            if val == min_val:
                min_indices.append(i+1)
            else:
                min_val = val
                min_indices = [i+1]

    return min_indices


def optimalk(x): #K* + Ki,j 행렬
    ylist = []
    order = []
    karr = [0]
    for z in range(1,x+1):
        slist = []
        for t in range(1,z+1):
            ylist.append(karr[t-1] +  klist(N)[t-1,z-1])
            slist.append(karr[t-1] +  klist(N)[t-1,z-1])
        if x-z > 0:
            for s in range(1, x-z+1):
                ylist.append(None)
        order.append([t,slist.index(min(slist))+1])
        karr.append(min(slist))
    result = np.array(ylist)
    result_matrix = result.reshape(x,x)

    return np.transpose(result_matrix)


def Kstar(x): #K*
    ylist = []
    order = []
    karr = [0]
    for z in range(1,x+1):
        slist = []
        for t in range(1,z+1):
            ylist.append(karr[t-1] +  klist(N)[t-1,z-1])
            slist.append(karr[t-1] +  klist(N)[t-1,z-1])
        if x-z > 0:
            for s in range(1, x-z+1):
                ylist.append(None)
        karr.append(min(slist))

    return karr


def orders(x): #optimal order combination
    ylist = []
    order = []
    karr = [0]
    for z in range(1,x+1):
        slist = []
        for t in range(1,z+1):
            ylist.append(karr[t-1] +  klist(N)[t-1,z-1])
            slist.append(karr[t-1] +  klist(N)[t-1,z-1])
        if x-z > 0:
            for s in range(1, x-z+1):
                ylist.append(None)
        order.append([minelements(slist),t])
        karr.append(min(slist))

    return order


print(optimalk(N))
print(Kstar(N))
print(orders(N))
