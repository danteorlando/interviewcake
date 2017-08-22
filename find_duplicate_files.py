'''
You left your computer unlocked and your friend decided to troll you by copying
a lot of your files to random spots all over your file system. Even worse, she
saved the duplicate files with random, embarrassing names
("this_is_like_a_digital_wedgie.txt" was clever, I'll give her that).

Write a function that returns a list of all the duplicate files. We'll check
them by hand before actually deleting them, since programmatically deleting
files is really scary. To help us confirm that two files are actually
duplicates, return a list of tuples ↴ where:

the first item is the duplicate file
the second item is the original file
For example:

 [('/tmp/parker_is_dumb.mpg', '/home/parker/secret_puppy_dance.mpg'),
 ('/home/trololol.mov', '/etc/apache2/httpd.conf')]

You can assume each file was only duplicated once.

Gotchas
Are you correctly handling child folders as well as sibling folders? Be careful
that you're traversing your file tree correctly...

When you find two files that are the same, don't just choose a random one to
mark as the "duplicate." Try to figure out which one your friend made!

Does your solution work correctly if it's an empty file system (meaning the
root directory is empty)?

Our solution takes O(n) time and space, where n is the number of files. Is
your solution order of the total size on disc of all the files? If so, you can
do better!

To get our time and space costs down, we took a small hit on accuracy—we might
get a small number of false positives. We're okay with that since we'll
double-check before actually deleting files.

Complexity
Each "fingerprint" takes O(1) time and space, so our total time and space costs
are O(n) where nn is the number of files on the file system.

If we add the last-minute check to see if two files with the same fingerprints
are actually the same files (which we probably should), then in the worst case
all the files are the same and we have to read their full contents to confirm
this, giving us a runtime that's order of the total size of our files on disc.

Bonus
If we wanted to get this code ready for a production system, we might want to
make it a bit more modular. Try separating the file traversal code from the
duplicate detection code. Try implementing the file traversal with a generator!

What about concurrency? Can we go faster by splitting this procedure into
multiple threads? Also, what if a background process edits a file while our
script is running? Will this cause problems?

What about link files (files that point to other files or folders)? One gotcha
here is that a link file can point back up the file tree. How do we keep our
file traversal from going in circles?


'''
