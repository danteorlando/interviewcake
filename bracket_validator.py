'''
You're working with an intern that keeps coming to you with JavaScript code that
won't run because the braces, brackets, and parentheses are off. To save you
both some time, you decide to write a braces/brackets/parentheses validator.


Let's say:

'(', '{', '[' are called "openers."
')', '}', ']' are called "closers."
Write an efficient function that tells us whether or not an input string's
openers and closers are properly nested.

Examples:

"{ [ ] ( ) }" should return True
"{ [ ( ] ) }" should return False
"{ [ }" should return False

Breakdown
We can use a greedy approach to walk through our string character by character,
making sure the string validates "so far" until we reach the end.

What do we do when we find an opener or closer?


Well, we'll need to keep track of our openers so that we can confirm they get
closed properly. What data structure should we use to store them? When choosing
a data structure, we should start by deciding on the properties we want. In this
case, we should figure out how we will want to retrieve our openers from the
data structure! So next we need to know: what will we do when we find a closer?


Suppose we're in the middle of walking through our string, and we find our first
closer:

  [ { ( ) ] . . . .
      ^
How do we know whether or not that closer in that position is valid?

A closer is valid if and only if it's the closer for the most recently seen,
unclosed opener. In this case, '(' was seen most recently, so we know our
closing ')' is valid.

So we want to store our openers in such a way that we can get the most recently
added one quickly, and we can remove the most recently added one quickly (when
it gets closed). Does this sound familiar?

What we need is a stack !

Solution
We iterate through our string, making sure that:

each closer corresponds to the most recently seen, unclosed opener
every opener and closer is in a pair

We use a stack to keep track of the most recently seen, unclosed opener. And if
the stack is ever empty when we come to a closer, we know that closer doesn't
have an opener.

So as we iterate:

If we see an opener, we push it onto the stack.

If we see a closer, we check to see if it is the closer for the opener at the
top of the stack.

If it is, we pop from the stack. If it isn't, or if the stack is empty, we
return False.

If we finish iterating and our stack is empty, we know every opener was properly
closed.

  def is_valid(code):
    openers_to_closers = {
        '(' : ')',
        '{' : '}',
        '[' : ']'
    }

    openers = frozenset(openers_to_closers.keys())
    closers = frozenset(openers_to_closers.values())

    openers_stack = []

    for char in code:
        if char in openers:
            openers_stack.append(char)
        elif char in closers:
            if not openers_stack:
                return False
            else:
                last_unclosed_opener = openers_stack.pop()

                # if this closer doesn't correspond to the most recently
                # seen unclosed opener, short-circuit, returning false
                if not openers_to_closers[last_unclosed_opener] == char:
                    return False

    return openers_stack == []

Complexity
O(n) time (one iteration through the string), and O(n) space (in the worst case,
all of our characters are openers, so we push them all onto the stack).

Bonus
In Ruby, sometimes expressions are surrounded by vertical bars, "|like this|".
Extend your validator to validate vertical bars. Careful: there's no difference
between the "opener" and "closer" in this case they're the same character!

What We Learned
The trick was to use a stack .

It might have been difficult to have that insight, because you might not use
stacks that much.

Two common uses for stacks are:

parsing (like in this problem)
tree or graph traversal (like depth-first traversal)
So remember, if you're doing either of those things, try using a stack!


'''
s1 = "{ [ ] ( ) }"
s2 = "{ [ ( ] ) }"
s3 = "{ [ }"
s4 = "{ ( { [ ( [ ] { } ) { ( ) } ] } ) }"


def is_valid(code):
    brackets = code.split()
    openers = []
    for bracket in brackets:
        if bracket == '{' or bracket == '[' or bracket == '(':
            openers.append(bracket)
        else:
            b = openers.pop()
            if bracket == '}' and b != '{':
                return False
            elif bracket == ']' and b != '[':
                return False
            elif bracket == ')' and b != '(':
                return False
    return True

print(is_valid(s1))
print(is_valid(s2))
print(is_valid(s3))
print(is_valid(s4))
