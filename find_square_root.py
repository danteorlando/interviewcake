
'''
Method to calculation the square root of a number n.

This method uses an estimation algorithm and is only accurate to .01

The arbitrary limit on the first loop was added just for experimentation purposes.
This should be re-factored to remove this limit.
'''

def find_square_root(n):
    lower_bound = 1
    upper_bound = 2
    if n == 1:
        return 1
    while upper_bound < 100: #arbitrary limit to prevent infinite loops
        if n == (upper_bound * upper_bound):
            #print('square root of %d is %d' % (n, upper_bound))
            return upper_bound
        elif n > (upper_bound * upper_bound):
            lower_bound = upper_bound
            upper_bound += 1
        else:
            #print('square root of %d is between %d and %d' % (n,lower_bound, upper_bound))
            while lower_bound < upper_bound:
                if n > (lower_bound * lower_bound):
                    lower_bound += .01
                    #print(lower_bound)
                else:
                    #print('square root of %d is approximately %f' % (n, lower_bound))
                    return lower_bound
    
print(find_square_root(6))
print(find_square_root(7))
print(find_square_root(8))
print(find_square_root(9))
print(find_square_root(10))
print(find_square_root(47))
print(find_square_root(50))


