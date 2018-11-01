package com.hapex.diary.service

import com.hapex.diary.data.dao.PeopleDao
import com.hapex.diary.data.dto.PersonDto
import com.hapex.diary.data.model.Person
import com.hapex.diary.util.exception.http.InvalidRequestException
import com.hapex.diary.util.exception.http.ResourceNotFoundException
import org.joda.time.LocalDate
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import java.util.*

@Service
class PeopleService(private val peopleDao: PeopleDao) {

    fun findAll(pageable: Pageable) = peopleDao.findAll(pageable)
    fun findById(id: Long): Person = peopleDao.findById(id) ?: throwNotFound(id)

    fun deleteById(id: Long)
            = if(peopleDao.existsById(id))  peopleDao.deleteById(id) else throwNotFound(id)

    fun addPerson(dto: PersonDto): Person {
        validateDto(dto)
        val person = Person(dto.fullName, dto.description, LocalDate(Date(dto.birthDate)))
        return peopleDao.save(person)
    }

    fun updatePerson(id: Long, dto: PersonDto): Person {
        validateDto(dto)
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

    private fun throwNotFound(id: Long): Nothing = throw ResourceNotFoundException("Person with id=$id not found!")

    private fun validateDto(dto: PersonDto) {
        if(dto.fullName.isBlank())
            throw InvalidRequestException("Person name cannot be blank!")
    }
}
