
def find_missing_drone(delivery_id_confirmations):
    t = 0
    for i in delivery_id_confirmations:
        t ^= i
    return t


def test():
    assert find_missing_drone([1,2,3,4,5,1,2,3,4]) == 5
    assert find_missing_drone([21,33,21,45,78,89,45,33,89]) == 78
    
    
test()



