# NCEA Note Repository
NCEA Note Repository is a web application allowing high-school students to collate and share their NCEA notes

## Database Development
### Web-Scraping
To get all of the relevant standards available, I needed to perform web-scraping on nzqa.govt.nz. 

I wrote a simple Python program to do this, using Requests and BeautifulSoup.

Technology:
- Python v3.11
- Requests v2.31
- BeautifulSoup v4.12.2

<img src="https://github.com/Lucaseng/NCEANoteRepository/assets/26078574/aa51e751-bf55-4f5a-9b79-98922451c9d3" height="400">


### Database Schema
After retrieving this data, I was able to fully map out a schema. Due to the relational nature of the data, it makes best sense to use a MySQL database.

<img src="https://github.com/Lucaseng/NCEANoteRepository/assets/26078574/29be4568-750f-43d9-8232-ef694180aceb" height="400">
