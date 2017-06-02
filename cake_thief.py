
def max_value_for_capacity(cakes, capacity):
    max_tuple = ()
    max_value_per_weight = 0
    for t in cakes:
        weight = t[0]
        value = t[1]
        value_per_weight = 0
        if weight == 0 and value > 0:
            return "infinity"
        elif weight == 0 and value == 0:
            print("skip cakes with no weight and no value")
        else:
            if weight <= capacity:
                value_per_weight = (value / weight)
                if value_per_weight > max_value_per_weight:
                    max_value_per_weight = value_per_weight
                    max_tuple = t
    
    return max_tuple            
        
 

def max_duffel_bag_value(cakes, capacity):
    total_value = 0
    remaining_capacity = capacity
    while (remaining_capacity > 0):
        cake = max_value_for_capacity(cakes, remaining_capacity)
        print("grabbed cake %s" % (cake,))
        if cake == "infinity":
            return "jackpot"
        total_value += cake[1]
        print("total value = %d" % (total_value))
        remaining_capacity -= cake[0]
        print("remaining capacity = %d" % (remaining_capacity))
        
    return total_value

cake_tuples = [(7, 160), (3, 90), (2, 15), (0, 0)]
cake_tuples2 = [(1, 30), (50, 200)]

capacity = 20

print(max_duffel_bag_value(cake_tuples2, 100))
#print(max_value_for_capacity(cake_tuples, 2))


        