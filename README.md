# Node.js Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Architecture](#architecture)
3. [Web Server Creation](#web-server-creation)
4. [URL Structure](#url-structure)
5. [HTTP Methods](#http-methods)
6. [Express Framework](#express-framework)
7. [Version Control](#version-control)
8. [REST API](#rest-api)
9. [Middlewares](#middlewares)
10. [HTTP Headers & Status Codes](#http-headers--status-codes)

## Introduction

Node.js is a runtime that executes JavaScript code outside the browser.

### JavaScript Engine
The most popular JavaScript engine is Google’s V8 engine:

* Used by the Google Chrome browser
* Created by Google
* Written in C++
* Open source

Together these components converge into **Node.js**:

- You can run JavaScript outside the browser
- JavaScript can talk to the native machine via C++ bindings
- You can create web servers using JavaScript

Note: **Node.js** was created by Ryan Dahl and is a runtime environment for JavaScript.

We create `.js` files with executable logic.
To reuse those files, we need to:

- Use `module.exports` to export them
- Use the `require` function (or `import` in ESM) to import them in other files

To handle files, we use the `fs` (File System) module.

## Architecture

In the event loop we have blocking and non‑blocking operations.
Blocking operations require a thread (worker).
Node.js assigns such work to the lib thread pool and returns the result asynchronously.

Basically, synchronous calls are blocking; asynchronous calls are non‑blocking.

## Web Server Creation

To create a web server, we use the built‑in `http` package.
First, create a server using `http.createServer()`.

This function receives a callback with the parameters `req` and `res`.
Use these to handle incoming requests and write responses (and optionally to log requests).

Next, assign a port for the server to listen on with `server.listen(port, callback)`
(e.g., `8000`). The callback runs once the server is listening.

## URL Structure

Example: `https://www.google.com/`

- `https://` is the protocol (`s` for secure)
- `www.google.com` is the domain — a user‑friendly name for the server’s IP address
- `/` is the path
- Nested paths look like `/contact/1`
- Query parameters look like `/about?userId=1`

Note: `+` in URLs can represent a space in application/x-www-form-urlencoded data.

## HTTP Methods

- **GET**: Retrieve data from the server
- **POST**: Create a resource (send data to the server)
- **PUT**: Replace a resource entirely (idempotent)
- **PATCH**: Partially update a resource
- **DELETE**: Remove a resource
  The browser sends requests with these methods; query parameters may accompany any method.

POST: send data to create a resource (e.g., create a new user from a form submission).

PUT: replace a resource in full at a given URL.

PATCH: apply a partial update to an existing resource.

DELETE: remove data.

## Express Framework

First install Express: `npm i express`
Then initialize it: `const app = express()`
Now you can use `app` to access Express APIs.

Steps:

1. Require Express
2. Create `const app = express()`
3. Make your server listen on a port: `app.listen(port, callback)`
4. Create routes with `app.METHOD(path, callback)`

## Version Control

Version numbers follow the format: `MAJOR.MINOR.PATCH` (e.g., `4.18.2`).

- **MAJOR**: Breaking changes
- **MINOR**: Backwards‑compatible features
- **PATCH**: Bug fixes

To install a specific version:
`npm i <package>@<version>`

In `package.json` version ranges:
- `^1.2.3` allows compatible MINOR and PATCH updates (e.g., `>=1.2.3 <2.0.0`).
- `~1.2.3` allows PATCH updates (e.g., `>=1.2.3 <1.3.0`).
- Exact `1.2.3` pins the version.
- Comparators like `>`, `<`, `>=` specify ranges.
- The tag `latest` installs the latest published version.
If you need to lock to an exact version, remove range operators like `^` or `~`.

## REST API

A REST (Representational State Transfer) API is an architectural style for designing networked applications. It follows these principles:

- Client‑Server separation
- Stateless communication
- Uniform interface
- Resource‑based URLs

SERVER CLIENT (browser)

Browser → REQUEST → Server → RESPONSE → Browser


Best practices:
- Server / Client architecture
- Server separated from the client

Response: Text, Image, HTML docs, JSON

Example:
- GET /blogs → Fetch DB → HTML/SSR (res)
- GET /blogs → Fetch DB (XML/JSON) → JSON (res) // Frontend decides how to handle the data.

Always respect HTTP methods: GET, POST, PUT, PATCH, DELETE.

GET /users → read users'
POST /users → create user
PATCH /users/:id → update user

Technically, you could modify or delete with POST, but it’s not a good practice. Always use the correct methods.

With Express, we can send JSON responses using `res.json(data)` or `res.send(data)`.

Tip: Use Postman or similar tools to test endpoints.

## Middlewares

Middleware is a function that sits between the client and server to process requests and responses.

We can use multiple middlewares as necessary to validate and transform requests.

These functions have access to `req`, `res`, and the `next` function, allowing chaining.

Middlewares are executed in a stack; their order in code matters.

The `next` function connects middlewares; the cycle stops when no `next` is called and a response is sent.

## HTTP Headers & Status Codes

### Headers
Headers provide metadata about the request/response:
- Source IP address
- Destination IP address
- Content-Type
- Custom headers (often prefixed with `X-`)

### Status Codes

| Status Code Range | Description             |
|-------------------|-------------------------|
| `100-199`         | Informational responses |
| `200-299`         | Successful responses    |
| `300-399`         | Redirection messages    |
| `400-499`         | Client error responses  |
| `500-599`         | Server error responses  |

HTTP headers are an important part of API requests and responses as they
represent metadata associated with them. Headers carry information about the
request and response bodies.
> Metadata is data about the data.


