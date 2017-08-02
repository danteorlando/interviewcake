'''
You're working on a secret team solving coded transmissions.
Your team is scrambling to decipher a recent message, worried it's a plot to break into a major European National Cake Vault. The message has been mostly deciphered, but all the words are backwards! Your colleagues have handed off the last step to you.

Write a function reverse_words() that takes a string message and reverses the order of the words in-place. 

Since strings in Python are immutable , we'll first convert the string into a list of characters, do the in-place word reversal on that list, and re-join that list into a string before returning it. This isn't technically "in-place" and the list of characters will cost O(n)O(n) additional space, but it's a reasonable way to stay within the spirit of the challenge. If you're comfortable coding in a language with mutable strings, that'd be even better!

For example:

  message = 'find you will pain only go you recordings security the into if'

reverse_words(message)
# returns: 'if into the security recordings you go only pain will you find'

When writing your function, assume the message contains only letters and spaces, and all words are separated by one space.


Breakdown
We'll start by converting the message string into a list of characters.

  def reverse_words(message):
    message_list = list(message)
    ...
Python
Now, how can we move things around?

Let’s start with a simpler problem. What if we wanted to reverse all the characters in the message?

Well, we could swap the first character with the last character, then the second character with the second to last character, and so on, moving towards the middle. Can you implement this in code?

  def reverse_characters(message):
    message_list = list(message)

    # walk towards the middle, from both sides
    for front_index in xrange(len(message_list) / 2):
        back_index = -front_index - 1

        # swap the front char and back char
        message_list[front_index], message_list[back_index] = \
            message_list[back_index], message_list[front_index]

    return ''.join(message_list)

We're using a cute one-liner to do the swap. In other languages you might need to do the swap by hand, recording one of the values in a temp variable.

Ok, looks good. Does this help us?

Can we use the same concept but apply it to words instead of characters?

Probably. We'll have to figure out a couple things:

How do we figure out where words begin and end?
Once we know the start and end indices of two words, how do we swap those two words?
We could attack either of those first, but I'm already seeing a potential problem in terms of runtime. Can you guess what it is?

What happens when you swap two words that aren't the same length?

  "the eagle has landed"

Supposing we already knew the start and end indices of 'the' and 'landed', how long would it take to swap them?

O(n) time, where nn is the total length of the string!

Why? Notice that in addition to moving 'the' to the back and moving 'landed' to the front, we have to "scoot over" everything in between, since 'landed' is longer than 'eagle'.

So what'll be the total time cost with this approach? Assume we'll be able to learn the start and end indices of all of our words in just one pass (O(n)O(n) time).

O(n2) total time. Why? In the worst case we have almost as many words as we have characters, and we're always swapping words of different lengths. For example:

  "a bb c dd e ff g hh"

We take O(n)O(n) time to swap the first and last words (we have to move all nn characters):

  'a bb c dd e ff g hh' # input
'hh bb c dd e ff g a' # first swap

Then for the second swap:

  'a bb c dd e ff g hh' # input
'hh bb c dd e ff g a' # first swap
'hh g c dd e ff bb a' # second swap

We have to move all nn characters except the first and last words, and a couple spaces. So we move n-5 characters in total.

For the third swap, we have another 55 characters we don't have to move. So we move n-10 in total. We'll end up with a series like this:

n + (n-5) + (n-10) + (n-15) + ... + 6 + 1 
This is a subsection of the common triangular series.  We're just skipping 4 terms between each term!

So we have the sum of "every fifth number" from that triangular series. That means our sum will be about a fifth the sum of the original series! But in big O notation dividing by 5 is a constant, so we can throw it out. The original triangular series is O(n^2), and so is our series with every fifth element!

Okay, so O(n^2) time. That's pretty bad. It's possible that's the best we can do...but maybe we can do better?

Let's try manipulating a sample input by hand.

And remember what we did for our character-level reversal...

Look what happens when we do a character-level reversal:

  'the eagle has landed' # input
'dednal sah elgae eht' # character-reversed

Notice anything?

What if we put it up against the desired output:

  'the eagle has landed' # input
'dednal sah elgae eht' # character-reversed
'landed has eagle the' # word-reversed (desired output)

The character reversal reverses the words! It's a great first step. From there, we just have to "unscramble" each word.

More precisely, we just have to re-reverse each word!

Solution
We'll write a helper function reverse_characters() that reverses all the characters in a string between a front_index and back_index. We use it to:

Reverse all the characters in the entire message, giving us the correct word order but with each word backwards.
Reverse the characters in each individual word.
  def reverse_words(message):

    message_list = list(message)

    # first we reverse all the characters in the entire message_list
    reverse_characters(message_list, 0, len(message_list)-1)
    # this gives us the right word order
    # but with each word backwards

    # now we'll make the words forward again
    # by reversing each word's characters

    # we hold the index of the *start* of the current word
    # as we look for the *end* of the current word
    current_word_start_index = 0

    for i in xrange(len(message_list) + 1):

        # found the end of the current word!
        if (i == len(message_list)) or (message_list[i] == ' '):

            reverse_characters(message_list, current_word_start_index, i-1)

            # if we haven't exhausted the string our
            # next word's start is one character ahead
            current_word_start_index = i + 1

    return ''.join(message_list)

def reverse_characters(message_list, front_index, back_index):

    # walk towards the middle, from both sides
    while front_index < back_index:

        # swap the front char and back char
        message_list[front_index], message_list[back_index] = \
            message_list[back_index], message_list[front_index]

        front_index += 1
        back_index  -= 1

    return message_list

Complexity
O(n)O(n) time and O(n)O(n) space. Our space cost comes from converting the message string to a list. If our input was a list, our space cost would be O(1)O(1) because we'd be using a constant amount of additional space beyond the input.

Hmm, the team used your function to finish deciphering the message. There definitely seems to be a plot brewing, but no specifics on where. The sender seemed to really like Eccles cakes. Any ideas?

Bonus
How would you handle punctuation?

What We Learned
The naive solution of reversing the words one at a time had a worst-case O(n^2) runtime. That's because swapping words with different lengths required "scooting over" all the other characters to make room.

To get around this "scooting over" issue, we reversed all the characters in the string first. This put all the words in the correct spots, but with the characters in each word backwards. So to get the final answer, we reversed the characters in each word. This all takes two passes through the string, so O(n)O(n) time total.

This might seem like a blind insight, but we derived it by using a clear strategy:

Solve a simpler version of the problem (in this case, reversing the characters instead of the words), and see if that gets us closer to a solution for the original problem.

We talk about this strategy in the "get unstuck" section of our coding interview tips.


'''