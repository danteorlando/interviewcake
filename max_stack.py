'''
You want to be able to access the largest element in a stack.
You've already implemented this Stack class:

  class Stack:

    # initialize an empty list
    def __init__(self):
        self.items = []

    # push a new item to the last index
    def push(self, item):
        self.items.append(item)

    # remove the last item
    def pop(self):
        # if the stack is empty, return None
        # (it would also be reasonable to throw an exception)
        if not self.items:
            return None
        return self.items.pop()

    # see what the last item is
    def peek(self):
        if not self.items:
            return None
        return self.items[-1]

Use your Stack class to implement a new class MaxStack with a function get_max()
that returns the largest element in the stack. get_max() should not remove the
item.

Your stacks will contain only integers.

Gotchas
What if we push several items in increasing numeric order (like 1, 2, 3, 4...),
so that there is a new max after each push()? What if we then pop() each of
these items off, so that there is a new max after each pop()? Your algorithm
shouldn't pay a steep cost in these edge cases.

You should be able to get a runtime of O(1)O(1) for push(), pop(), and
get_max().

Breakdown
One lazy approach is to have get_max() simply walk through the stack and find
the max element. This takes O(n) time for each call to get_max(). But we can
do better.

To get O(1) time for get_max(), we could store the max integer as a member
variable (call it max). But how would we keep it up to date?

For every push(), we can check to see if the item being pushed is larger than
the current max, assigning it as our new max if so. But what happens when we
pop() the current max? We could re-compute the current max by walking through
our stack in O(n) time. So our worst-case runtime for pop() would be O(n). We
can do better.

What if when we find a new current max (new_max), instead of overwriting the old
one (old_max) we held onto it, so that once new_max was popped off our stack we
would know that our max was back to old_max?

What data structure should we store our set of maxs in? We want something where
the last item we put in is the first item we get out ("last in, first out").

We can store our maxs in another stack!

Solution
We define two new stacks within our MaxStack class—stack holds all of our
integers, and maxes_stack holds our "maxima." We use maxes_stack to keep our max
up to date in constant time as we push() and pop():

Whenever we push() a new item, we check to see if it's greater than or equal to
the current max, which is at the top of maxes_stack. If it is, we also push() it
onto maxes_stack. Whenever we pop(), we also pop() from the top of maxes_stack
if the item equals the top item in maxes_stack.

  class MaxStack:

    def __init__(self):
        self.stack      = Stack()
        self.maxes_stack = Stack()

    # Add a new item to the top of our stack. If the item is greater
    # than or equal to the last item in maxes_stack, it's
    # the new max! So we'll add it to maxes_stack.
    def push(self, item):
        self.stack.push(item)
        if self.maxes_stack.peek() is None or item >= self.maxes_stack.peek():
            self.maxes_stack.push(item)

    # Remove and return the top item from our stack. If it equals
    # the top item in maxes_stack, they must have been pushed in together.
    # So we'll pop it out of maxes_stack too.
    def pop(self):
        item = self.stack.pop()
        if item == self.maxes_stack.peek():
            self.maxes_stack.pop()
        return item

    # The last item in maxes_stack is the max item in our stack.
    def get_max(self):
        return self.maxes_stack.peek()

Complexity
O(1) time for push(), pop(), and get_max(). O(m) additional space, where mm is
the number of operations performed on the stack.

Notice that our time-efficient approach takes some additional space, while a
lazy approach (simply walking through the stack to find the max integer whenever
get_max() is called) took no additional space. We've traded some space
efficiency for time efficiency.

What We Learned
Notice how in the solution we're spending time on push() and pop() so we can
save time on get_max(). That's because we chose to optimize for the time cost of
calls to get_max().

But we could've chosen to optimize for something else. For example, if we
expected we'd be running push() and pop() frequently and running get_max()
rarely, we could have optimized for faster push() and pop() functions.

Sometimes the first step in algorithm design is deciding what we're optimizing
for. Start by considering the expected characteristics of the input.

'''
