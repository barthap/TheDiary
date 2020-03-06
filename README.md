# TheDiary
Interactive diary. It could be also used as evidence database in any investigations or
sth like that. The key is that this app stores multiple data types (entities), for
example _Documents, photos, files, people, conversations_ and a special entity type called _Story_
which is a document describing events in chronological order. All entities, regardless of their type
can be referenced by each other, they are interconnected - this allows to see any photos/people releated
to particular event (story item), and even draw a relationship graph.

## Update 03/2020
For over a year nothing was happening here. I had no time for this project
becouse I had other more important work. Also, after some thinking I am going to
restructure this project a bit, do some cleanup and simplify it by
removing some overkill solutions.

## Wiki
Readme has grown too big. It is being moved to [Wiki](https://github.com/barthap/TheDiary/wiki). All
project details can be found there

## Demo
_Coming soon..._

## Summary

#### Entity types and relationships (references)
- **Story** - tells the whole story, event description in chronological order
- Document - All kind of text documents, supports Markdown, Word, PDF
- Photo/Video - Image and video files
- Person - People personal details, everything we know about them
- Conversation** - Imported conversations from FBMessenger etc.
- Files - all other filetypes

Each entity can be referenced-in or have reference-to each-other.
Relations are One Way, but they are seen in both Source and Target Entity.

#### Development
Used technologies, patterns etc.
##### General
- Markdown support for entitiess
- RESTful API design
- Monolith architecture, no microservices

##### [Frontend](Frontend/README.md)
- Languages: TypeScript _(main)_, JavaScript (ES2015+)
- Frameworks: ReactJS, Redux
- Server-side rendering for production build

##### [Backend](Backend/README.md)
- Languages: Kotlin _(main)_, Java
- Spring Boot 2.0
- SQLite database
- raw JDBC Template

## How to run/build
See details on [Wiki page](https://github.com/barthap/TheDiary/wiki).

> Frontend build may not work because of some wrong npm dependencies versions!
