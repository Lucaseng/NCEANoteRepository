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

## Backend Development

The Backend is being written using ASP.Net Core.

Technology:
- ASP.Net Core 
- Entity Framework Core 6.0.6
- LINQ 4.3.0

So far, I have written 19 endpoints. Some endpoints may not be called by the clientside. Sensitive endpoints have authentication/authorisation roles to prevent unauthorised access.
![image](https://github.com/Lucaseng/NCEANoteRepository/assets/26078574/3cb2de2a-a72a-40f6-b9d0-81bc0e0241e2)

### Backend Architecture
I am using the classic MVC Architecture to write this API. The folder structure (in its current state) is as follows:

<img src="https://github.com/Lucaseng/NCEANoteRepository/assets/26078574/2f11dc4c-1d4c-4c4b-bdec-38ea0bc35f6a" height="400">

## Project Management
I am trying out Asana to manage my workflow.

![image](https://github.com/Lucaseng/NCEANoteRepository/assets/26078574/92d2f8e6-8dfe-4012-ab76-c2f0a1d7bc49)

Update 5/07/23: Using Asana for project management is proving to be a reasonably successful technique. 
![image](https://github.com/Lucaseng/NCEANoteRepository/assets/26078574/07f2c3dd-3538-4dcf-9de0-724b681b7f2f)


## Frontend Development

The frontend is being written using React.js and MUI

Initial project setup and sidebar creation has been completed. Routing to different pages has also been accomplished.
I have now created a NoteCard component which will dynamically display Note content. 

![client](https://github.com/Lucaseng/NCEANoteRepository/assets/26078574/b73507d2-f74d-441e-ac8b-2febda5578b8)
