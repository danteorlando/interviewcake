class LinkedListNode:
    def __init__(self, value):
        self.value = value
        self.next  = None


a = LinkedListNode("1")
b = LinkedListNode("2")
c = LinkedListNode("3")
d = LinkedListNode("4")
e = LinkedListNode("5")

a.next = b
b.next = c
c.next = d
d.next = e

def print_list(head):
    while head != None:
        print(head.value)
        head = head.next

print_list(a)

def reverse_list(head):
    if head == None:
        return
    reverse_list(head.next)

reverse_list(a)
print_list(a)


def print_in_reverse_order(node):
    if node == None:
        return
    print_in_reverse_order(node.next)
    print(node.value)

#print_in_reverse_order(a)



    
