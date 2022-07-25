
<p><h2 align="center" dir="auto"><b>Epicode School - Front-End Final Project</b></h2></p>

<p align="center" dir="auto"><b>Technologies Used:</b></p>
<p align="center" dir="auto"> 
  <a href="https://github.com/gi-ga-dev" target="_blank" rel="nofollow"> 
    <img src="https://user-images.githubusercontent.com/77717069/176915746-fe6aef56-4fc7-465f-b255-6a44ee086f70.png" alt="ng" width="90">
  </a> 
    <a href="https://github.com/gi-ga-dev" target="_blank" rel="nofollow"> 
    <img src="https://user-images.githubusercontent.com/77717069/180883930-26495d49-43c7-4cf8-9368-e9b3c11d1b5c.png" alt="ng-mat" width="85">
  </a> 
  <a href="https://github.com/gi-ga-dev" target="_blank" rel="nofollow"> 
    <img src="https://user-images.githubusercontent.com/77717069/176915899-7871db31-9ffa-448c-b7ca-29a4aa87b607.png" alt="scss" width="100">
  </a> 
  <a href="https://github.com/gi-ga-dev" target="_blank"> 
    <img src="https://user-images.githubusercontent.com/77717069/175181100-1bfce8a0-b414-48ac-a1a9-a9092cd82703.png" alt="bootstrap" width="100">
  </a> 
</p>

<p align="center" dir="auto"> <b>Project Introduction:</b> <br><br>

I created a complete CRUD Single Page Application for managing a Clients database with Electronic Tax Invoices.
The homepage is visible to anyone visiting the website, whereas the Client List page has the Guard enabled, which require registration/login access token in order to unlock the view. 

The `Tax Invoice List` page is only accessible by clicking the specific client. To bind invoices to each client, I added a client ID property to the invoices interface, and when navigating to the Tax Invoice page, I am passing all the client information to the sessionStorage, and retrieving them afterwards in order to bind all the invoices related to the specific client when a post method is invoked.

The `Client List` and `Tax Invoice List` pages have 1 table and 1 form each that stores the clients information and their relative tax invoices.
The process of creating and deleting clients/invoices is done with post/delete methods and get method to retrieve data. 
To modify existing data I passed the client/invoice info to the sessionStorage to re-fill the input forms with the details to change, and then clicking to the modify button will update the specific table data.

Pages: 
- `Homepage` | `Client List` | `Tax Invoice List` | `Login` | `Register` | `404 Page`

</p>

https://user-images.githubusercontent.com/77717069/180882041-a72ce8d3-d6e9-4639-a32a-303b3b3a6003.mp4


---------------------------------------------------------------------------

<b>First Setup (To retrieve all node_modules and fix peer dependencies error)</b>
- npm i @ng-bootstrap/ng-bootstrap --legacy-peer-deps
- ng s -o (to start compiling automatically and run project on angular live server)
- npm run backend (to start jwt server)
