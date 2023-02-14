import json
f = open("helper/words.txt", "r")
lines = f.readlines()
hash = {}
for line in lines:
    line = line.replace('\r\n', '')
    split = line.split(" ")
    print(" ".join(split[:-1]), split[-1])
    hash[split[-1]] = { 
        "cebuano": " ".join(split[:-1])
    }
with open("helper/words.json", "w") as outfile:
    json.dump(hash, outfile)