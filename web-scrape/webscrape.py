from bs4 import BeautifulSoup
import requests
import json


def getSubjects():
    url = "https://www.nzqa.govt.nz/ncea/subjects/?_gl=1*1i5zixr*_ga*MTAzODkyNTQxNC4xNjg3MzE0NDM0*_ga_TFQQ681L2E*MTY4NzMxNDQzNC4xLjAuMTY4NzMxNDQzNC4wLjAuMA.."

    result = requests.get(url)
    soup = BeautifulSoup(result.text, "html.parser")

    mainDiv = soup.find("div", {"id": "mainPage"})
    subjects = mainDiv.find_all("a")
    mySubjects = []
    for subject in subjects:
        mySubjects.append(subject.get_text())
    
    return mySubjects[2:-17]


def getStandards(mySubjects):
    data = []
    fail = []
    for subject in mySubjects:
        print("Searching", subject)
        for level in range(1, 4):
            try:
                myNewUrl = (
                    "https://www.nzqa.govt.nz/ncea/assessment/search.do?query="
                    + subject
                    + "&view=all&level=0"
                    + str(level)
                )
                result = requests.get(myNewUrl)
                soup = BeautifulSoup(result.text, "html.parser")
                mainTableRows = soup.find_all("tr", {"class": "dataHighlight"})
                for i in mainTableRows:
                    standardDetails = i.find_all("strong")
                    data.append(
                        {
                            "subject": subject,
                            "standard": standardDetails[0].text,
                            "title": standardDetails[1].text,
                            "credits": standardDetails[2].text,
                            "assessment": standardDetails[3].text,
                            "level": str(level),
                        }
                    )
            except Exception as e:
                print(e)
                fail.append(subject)

    return data

mySubjects = getSubjects()
myArr = getStandards(mySubjects)
json_object = json.dumps(myArr)

with open("tempSubs.json", "w") as outfile:
    outfile.write(json_object)


