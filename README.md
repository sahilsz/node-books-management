# node-books-management-API
> Node backend for managing books

A Node.js backend RESTful APIs for managing and storing individuals books. This is my submission project for one of my Interviews.

## Setup Locally


## API Endpoints

### Auth
User Registration
```
POST URL/auth/register
```
User Login
```
POST URL/auth/login
```
User Logout
```
GET URL/auth/logout
```

### CURD operation on Books

**CREATE Operations**:

Create book
```
POST URL/books
```
> Only logged in users can create a book, to get the authors details

**READ Operations:**

Get books
```
GET URL/books
```
Get single book
```
GET URL/books/ID
```

**UPDATE Opeartions**

Update book
```
PATCH URL/books/ID
```
> Note: Only the book author can update the book

**DELETE Opeartions**

Delete book
```
DELETE URL/books/ID
```
> Note: Only the book author can update the book

## Development setup

Clone this repo and instally packages listed in package.json
```bash
git clone https://github.com/sahilsz/node-books-management .
```

Install Dependencies
```
npm install
```

Run app locally
```
npm run dev
```

Run tests
```
npm run test
```

## Features
Required
- [x] Add a new book with (title, author, summary)
- [x] View list of all books
- [x] Update a book's details
- [x] Delete a book
- [x] Use MongoDB for storing book data.
- [x] Record a [video](https://youtu.be/-n8i7IfDyE4) demonstrating all CRUD operations [Link 🔗](https://youtu.be/-n8i7IfDyE4)
- [x] Documentation - Added a README.md wihtin the GIthub repository
- [x] Documenting - API endpoints and their usage
- [x] Documenting - Instructions to set up and run the application locally
- [x] Documenting - Any decision or assumption

Additional
- [x] Added Authentication using JWT to the backend
- [x] Added Authorization to the app
- [x] Restricted users from updating books of other users
- [x] Restricted users from deleting books of other users
- [x] Added **Unit Tests** for most of the routes

## Meta
Sahil - sahilsz@proton.me

https://github.com/sahilsz

## Contributing
1. Fork it (https://github.com/sahilsz/node-books-management)
2. Create your feature branch (`git checkout -b feature/foobar`)
3. Commint your changes (`git commit -am 'Add some foobar`)
4. Push to the branch(`git push origin feature/foobar`)
5. Create new Pull Request
