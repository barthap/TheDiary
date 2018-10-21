# Diary backend

**TODO:** Describe backend details here.

- Languages: Java, Kotlin
- Spring Boot 2.0
- SQLite database
- raw JDBC Template - no JPA, no ORM, because I don't think Hibernate
 would deal with inherited entities and make well-optimized queries.
 Also, I'd like to write functionalities provided by Spring Data JPA from scratch
 (my own implementation of repositories, paging and sorting etc...)
- Partially layered architecture. DDD, CQRS would not fit :/