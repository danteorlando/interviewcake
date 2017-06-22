'''
Write a program that prints the numbers from 1 to 100. 

But for multiples of three print "Fizz" instead of the number 
and for the multiples of five print "Buzz". 

For numbers which are multiples of both three and five print "FizzBuzz"

'''

for i in xrange(100):   
    if (i+1) % 3 == 0 and (i+1) % 5 == 0:
        print("FizzBuzz")
    elif (i+1) % 3 == 0:
        print("Fizz")
    elif (i+1) % 5 == 0:
        print("Buzz")
    else:
        print(i+1)
