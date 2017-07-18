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

#print_list(a)

def reverse_list(node):
    head = node # store a ref to head
    stck = []
    while node != None:
        stck.append(node.value)
        node = node.next
    
    node = head
    while node != None:
        node.value = stck.pop()
        node = node.next
    
    return head

print_list(reverse_list(a))


