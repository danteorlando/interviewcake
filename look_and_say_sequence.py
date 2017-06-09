def look_and_say_sequence(current_element):
    l = []
    prev = 0
    ctr = 0
    for n in [int(i) for i in str(current_element)]:
        if prev == 0:
            ctr += 1
            prev = n
        elif n == prev:
            ctr += 1
        else:
            l.append((ctr,prev))
            ctr = 1
            prev = n
    l.append((ctr,prev))
    
    next_element = ''
    for t in l:
        next_element += str(t[0])
        next_element += str(t[1])
        
    return int(next_element)
    
    
'''    
1
11
21
1211
111221
312211
13112221
1113213211
31131211131221
'''
def test():
    assert look_and_say_sequence(1) == 11
    assert look_and_say_sequence(11) == 21
    assert look_and_say_sequence(21) == 1211
    assert look_and_say_sequence(1211) == 111221
    assert look_and_say_sequence(111221) == 312211
    assert look_and_say_sequence(312211) == 13112221 
    assert look_and_say_sequence(13112221) == 1113213211
    assert look_and_say_sequence(1113213211) == 31131211131221  
test()

''' 
print(look_and_say_sequence(1))
print(look_and_say_sequence(11))
print(look_and_say_sequence(21))
print(look_and_say_sequence(1211))
print(look_and_say_sequence(111221))
print(look_and_say_sequence(312211))
print(look_and_say_sequence(13112221))
print(look_and_say_sequence(1113213211))
'''

