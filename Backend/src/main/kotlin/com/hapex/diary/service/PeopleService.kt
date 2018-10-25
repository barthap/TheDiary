package com.hapex.diary.service

import com.hapex.diary.dao.PeopleDao
import com.hapex.diary.dto.PersonDto
import com.hapex.diary.model.Person
import com.hapex.diary.util.exception.http.ResourceNotFoundException
import org.joda.time.DateTime
import org.joda.time.LocalDate
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import java.util.*

@Service
class PeopleService(private val peopleDao: PeopleDao) {

    fun findAll(pageable: Pageable) = peopleDao.findAll(pageable)
    fun findById(id: Long): Person = peopleDao.findById(id) ?: throw ResourceNotFoundException("Person with id=$id not found!")

    fun deleteById(id: Long) = peopleDao.deleteById(id)
    fun addPerson(dto: PersonDto): Person {
        val person = Person(dto.fullName, dto.description, LocalDate(Date(dto.birthDate)))
        return peopleDao.save(person)
    }

    fun updatePerson(id: Long, dto: PersonDto): Person {
        val person = findById(id)
        person.updateFromDto(dto)
        return peopleDao.save(person)
        /*return peopleDao.save(person.apply {
            this.fullName = dto.fullName
            this.birthDate = LocalDate(Date(dto.birthDate))
            this.description = dto.description
            this.updatedDateTime = DateTime.now()
        })*/
    }
}
