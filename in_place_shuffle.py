import random


def get_random(floor, ceiling):
    return random.randrange(floor, ceiling + 1)


def shuffle(a_list):
    cnt = len(a_list) - 1
    if cnt <= 1:
        return a_list
    for i in xrange(0, cnt):
        r = get_random(i,cnt)
        if i != r:
            #classic swap
            tmp = a_list[i]
            a_list[i] = a_list[r]
            a_list[r] = tmp
            #python swap
            #a_list[i], a_list[r] = a_list[r], a_list[i]
    return a_list


l = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print(shuffle(l))
print(shuffle(l))
print(shuffle(l))
print(shuffle(l))
print(shuffle(l))