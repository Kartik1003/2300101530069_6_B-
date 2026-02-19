k = []
k=2,4,5,3,6,2,4
n=len(k)
k=3
s=0
for i in range(0,n-k):
    l=k[i]+k[i+2]+k[i+1]
    if l>s:
        s=l
print(s)