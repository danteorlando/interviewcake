class LinkedListNode:
    def __init__(self, value):
        self.value = value
        self.next = None
        


def delete_node(node):
    temp_node = node.next
    if temp_node:
        temp_value = node.next.value
        temp_next = node.next.next
        node.value = temp_value
        node.next = temp_next
    else:
        raise Exception("Can't delete the last node with this method.")


a = LinkedListNode('A')
b = LinkedListNode('B')
c = LinkedListNode('C')

a.next = b
b.next = c

print(a.value, a.next.value, a.next.next.value)

delete_node(b)

print(a.value, a.next.value)


