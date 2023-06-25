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

<img src="https://github.com/Lucaseng/NCEANoteRepository/assets/26078574/e7b309cc-ed3f-4e18-96b1-244aa0b8ec1b" height="400">

### Database Schema
After retrieving this data, I was able to fully map out a schema. Due to the relational nature of the data, it makes best sense to use a MySQL database.

<img src="https://github.com/Lucaseng/NCEANoteRepository/assets/26078574/b08f015b-210b-46e2-8e66-3d00409157c7" height="400">
