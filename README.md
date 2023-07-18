# NCEA Note Repository
NCEA Note Repository is a web application allowing high-school students to collate and share their NCEA notes.

![C#](https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=c-sharp&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![.Net](https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white)
![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)
#

![image](https://github.com/Lucaseng/NCEANoteRepository/assets/26078574/55993516-6b67-493f-abe5-7e66d3737a34)
![image](https://github.com/Lucaseng/NCEANoteRepository/assets/26078574/6e526b9c-e3c0-462a-a328-ead0f42e3a93)
![image](https://github.com/Lucaseng/NCEANoteRepository/assets/26078574/9a6be1fc-8ee3-437b-bdfb-8201ff4324f5)
![image](https://github.com/Lucaseng/NCEANoteRepository/assets/26078574/48f78639-dd3c-46a5-8ccc-c6788984328d)

## Dependencies
The following environment variables are required for the client-side application:
- VITE_APP_API_URL - The URL for API calls e.g. https://localhost:8080

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

## Frontend Development

The frontend was written using React.js and MUI.

Technology:
- React.js v18.2.0
- MUI v5.13.7
- JavaScript (ES6+)

Features include:
- Home Page: This page allows users to search and filter through all avaliable notes. Signed in users can award kudos as desired.
- Upload Page: This page allows logged-in users to 'build a note'. By filling in the form, a demo Note-card uses React-States to update live; Allowing the user to see how their note will be formatted in real time. 
- Login Page: Allows a user to login
- Sign-up Page: Allows a user to signup. Users must sign up with a domain ending in .school.nz.

## Project Management
I used Asana to manage this project. I found that it was a relatively easy way to visualise progress:

![image](https://github.com/Lucaseng/NCEANoteRepository/assets/26078574/a0453d56-77b4-46ba-8f24-6adecb4309e2)

