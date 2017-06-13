'''
Implements a method for dividing two numbers using only bitwise operations.
'''
def bitwise_divide(numerator, denominator):
    result = 0
    if (denominator % 2 > 0):
        bits_to_shift = denominator / 2
        result = numerator >> bits_to_shift
    else:
        bits_to_shift = (denominator / 2)
        result = (numerator >> bits_to_shift) + 1
    return result
    
a = [1,2,3,4,5,6,7,8,9,10]
b = [None] * 10

total = 1

for n in a:
    total *= n

for i in xrange(len(a)):
    b[i] = bitwise_divide(total, a[i])
     
print(a)
print(total)
print(b)



