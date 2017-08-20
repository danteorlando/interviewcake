'''
Write a function for doing an in-place shuffle of a list.

The shuffle must be "uniform," meaning each item in the original list must have
the same probability of ending up in each spot in the final list.

Assume that you have a function get_random(floor, ceiling) for getting a random
integer that is >= floor and <= ceiling.

Gotchas
A common first idea is to walk through the list and swap each element with a
random other element. Like so:

  import random

def get_random(floor, ceiling):
    return random.randrange(floor, ceiling + 1)

def naive_shuffle(the_list):

    # for each index in the list
    for first_index in xrange(0,len(the_list)-1):

        # grab a random other index
        second_index = get_random(0, len(the_list)-1)

        # and swap the values
        if second_index != first_index:
            the_list[first_index], the_list[second_index] = the_list[second_index], the_list[first_index]

However, this does not give a uniform random distribution.

Why? We could calculate the exact probabilities of two outcomes to show they
aren't the same. But the math gets a little messy. Instead, think of it this
way:

Suppose our list had 3 elements: [a,b,c]. This means it'll make 3 calls to
get_random(0, 2). That's 33 random choices, each with 33 possibilities. So our
total number of possible sets of choices is 3*3*3=273. Each of these 27 sets of
choices is equally probable.

But how many possible outcomes do we have? If you paid attention in stats class
you might know the answer is 3!, which is 6. Or you can just list them by hand
and count:

a,b,c
a,c,b
b,a,c
b,c,a
c,b,a
c,a,b

But our function has 2727 equally-probable sets of choices. 2727 is not evenly
divisible by 66. So some of our 66 possible outcomes will be achievable with
more sets of choices than others.

We can do this in a single pass. O(n) time and O(1) space.

A common mistake is to have a mostly-uniform shuffle where an item is less
likely to stay where it started than it is to end up in any given slot. Each
item should have the same probability of ending up in each spot, including the
spot where it starts.

Breakdown
It helps to start by ignoring the "in-place" requirement, then adapt the
approach to work in-place.

Also, the name "shuffle" can be slightly misleading�the point is to arrive at a
random ordering of the items from the original list. Don't fixate too much on
preconceived notions of how you would "shuffle" e.g. a deck of cards.

How might we do this by hand?

We can simply choose a random item to be the first item in the resulting list,
then choose another random item (from the items remaining) to be the second item
in the resulting list, etc.

Assuming these choices were in fact random, this would give us a uniform
shuffle. To prove it rigorously, we can show any given item aa has the same
probability (1/n) of ending up in any given spot.

First, some stats review: to get the probability of an outcome, you need to
multiply the probabilities of all the steps required for that outcome. Like so:

Outcome             Steps                                                                        Probability
item #1 is a        a is picked first                                                            1/n
item #2 is a        a not picked first, a picked second                                          (n-1)/n * 1/(n-1) = 1/n
item #3 is a        a not picked first, a not picked second, a picked third                      (n-1)/n * (n-2)/(n-1) * 1/(n-2) = 1/n
item #4 is a        a not picked first, a not picked second, a not picked third, a picked fourth (n-1)/n * (n-2)/(n-1) * (n-3)/(n-2) * 1/(n-3) = 1/n

So, how do we implement this in code?

If we didn't have the "in place" requirement, we could allocate a new list, then
one-by one take a random item from the input list, remove it, put it in the
first position in the new list, and keep going until the input list is empty
(well, probably a copy of the input list�best not to destroy the input)

How can we adapt this to be in-place?

What if we make our new "random" list simply be the front of our input list?

Solution
We choose a random item to move to the first index, then we choose a random
other item to move to the second index, etc. We "place" an item in an index by
swapping it with the item currently at that index.

Crucially, once an item is placed at an index it can't be moved. So for the
first index we choose from nn items, for the second index we choose from n-1
items, etc.

import random

def get_random(floor, ceiling):
    return random.randrange(floor, ceiling + 1)

def shuffle(the_list):
    # if it's 1 or 0 items, just return
    if len(the_list) <= 1:
        return the_list

    last_index_in_the_list = len(the_list) - 1

    # walk through from beginning to end
    for index_we_are_choosing_for in xrange(0, len(the_list) - 1):

        # choose a random not-yet-placed item to place there
        # (could also be the item currently in that spot)
        # must be an item AFTER the current item, because the stuff
        # before has all already been placed
        random_choice_index = get_random(index_we_are_choosing_for, last_index_in_the_list)

        # place our random choice in the spot by swapping
        if random_choice_index != index_we_are_choosing_for:
            the_list[index_we_are_choosing_for], the_list[random_choice_index] = \
                the_list[random_choice_index], the_list[index_we_are_choosing_for]


This is a semi-famous algorithm known as the Fisher-Yates shuffle (sometimes
called the Knuth shuffle).

Complexity
O(n) time and O(1) space.

What We Learned
Don't worry, most interviewers won't expect a candidate to know the Fisher-Yates
shuffle algorithm. Instead, they'll be looking for the problem-solving skills to
derive the algorithm, perhaps with a couple hints along the way.

They may also be looking for an understanding of why the naive solution is
non-uniform (some outcomes are more likely than others). If you had trouble with
that part, try walking through it again.

'''
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
