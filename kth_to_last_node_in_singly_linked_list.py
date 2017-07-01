'''
You have a linked list ↴ and want to find the kkth to last node.
Write a function kth_to_last_node() that takes an integer kk and the head_node of a singly linked list, and returns the kkth to last node in the list.

For example:

  class LinkedListNode:

    def __init__(self, value):
        self.value = value
        self.next  = None

a = LinkedListNode("Angel Food")
b = LinkedListNode("Bundt")
c = LinkedListNode("Cheese")
d = LinkedListNode("Devil's Food")
e = LinkedListNode("Eccles")

a.next = b
b.next = c
c.next = d
d.next = e

kth_to_last_node(2, a)
# returns the node with value "Devil's Food" (the 2nd to last node)
'''