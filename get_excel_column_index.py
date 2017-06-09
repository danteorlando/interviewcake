import string

def get_excel_column_index(column_name):
    index = 0
    chars = list(column_name)
    first_char = ''
    second_char = ''
    third_char = ''
    if len(chars) == 3:
        first_char = chars[0]
        second_char = chars[1]
        third_char = chars[2]
        index = (26 * 26 * (string.uppercase.index(first_char) + 1)) + (26 * (string.uppercase.index(second_char) + 1)) + (string.uppercase.index(third_char) + 1)
    elif len(chars) == 2:
        first_char = chars[0]
        second_char = chars[1]
        index = (26 * (string.uppercase.index(first_char) + 1)) + (string.uppercase.index(second_char) + 1)
    else:
        first_char = chars[0]
        index = string.uppercase.index(first_char) + 1    
    return index

print(get_excel_column_index('A'))
print(get_excel_column_index('AZ'))
print(get_excel_column_index('BA'))
print(get_excel_column_index('ZZ'))
print(get_excel_column_index('XFD'))

