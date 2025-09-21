f = open("dummy_data.txt")

lines = f.readlines()

for line in lines:
    s = line.split("\t")
    print("{")
    print("  rid:\"{}\",".format(s[0]))
    print("  name:\"{}\",".format(s[1]))
    print("  cuisine:\"{}\",".format(s[2]))
    print("  type:\"{}\",".format(s[3]))
    print("  halal:\"{}\",".format(s[4]))
    print("  description:\"{}\"".format(s[5]))
    print("},")
