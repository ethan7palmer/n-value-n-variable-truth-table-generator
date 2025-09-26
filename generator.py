
vals = [1, 2, 3]
vars = ['A', 'B', 'C']

num_vals = len(vals)
num_vars = len(vars)

# Each sub array represents a column in the table
# the top of the column is the leftmost element in the sub array
# the first column is the first sub array
result = []

for i in range(num_vars):
    col = []

    # How many times each value should be repeated consecutively in this column
    repeat_times = num_vals ** i
    # How many times the entire sequence of repeated values should be repeated in this column
    num_repeats = num_vals ** (num_vars - i - 1)

    # For exmaple, if num_vals = 3 and num_vars = 3
    # For the first column (i=0), repeat_times = 1, num_repeats = 9
    # For the second column (i=1), repeat_times = 3, num_repeats = 3
    # For the third column (i=2), repeat_times = 9, num_repeats = 1
    # This results in the following columns:
    # First column: 1,2,3 repeated 9 times
    # Second column: 1,1,1,2,2,2,3,3,3 repeated 3 times
    # Third column: 1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3

    # Construct the column
    for _ in range(num_repeats):
        for val in vals:
            # Append the value 'repeat_times' times
            col.extend([val] * repeat_times)
    result.append(col)

result = result[::-1]

# *result unpacks the list of lists into separate arguments for zip
# for exmaple zip(*[[1,2,3],[4,5,6]]) is equivalent to zip([1,2,3],[4,5,6])
# zip combines elemtns at the same index from each list into tuples
# for example zip([1,2,3],[4,5,6]) results in [(1,4),(2,5),(3,6)]
result = list(zip(*result))

print(tuple(vars))
print(result)