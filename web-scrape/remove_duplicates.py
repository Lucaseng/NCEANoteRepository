import json

def removeDuplicates(arr):
    myDict = {}
    newArr = []
    blacklistedArr = ["Agribusiness (Business Studies)", "Hangarau"]
    for i in arr:
            if i['subject'] not in blacklistedArr and i['standard'] not in myDict:
                newArr.append(i)
                myDict[i['standard']] = 1

    return newArr

# Opening JSON file
f = open('tempSubs.json')
  
# returns JSON object as 
# a dictionary
data = json.load(f)
  
# Iterating through the json
# list
print(len(data))
newArr = removeDuplicates(data)
print(len(newArr))

# Serializing json
json_object = json.dumps(newArr)
 
# Writing to sample.json
with open("standards.json", "w") as outfile:
    outfile.write(json_object)
  
# Closing file
f.close()
