package com.hapex.diary.controller

import com.hapex.diary.data.dto.PersonDto
import com.hapex.diary.service.PeopleService
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

/**
 * Created by barthap on 18.10.2018.
 * No idea what to write here
 * *you know, no IDEA, IntelliJ IDEA xDDD
 */
@RestController
@RequestMapping("/people")
class PeopleController (private val peopleService: PeopleService) {

    @GetMapping
    fun getAll(pageable: Pageable) = peopleService.findAll(pageable)

    @GetMapping("/{id}")
    fun getPerson(@PathVariable id: Long) = peopleService.findById(id)

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun addPerson(@RequestBody dto: PersonDto) = peopleService.addPerson(dto)

    @PutMapping("/{id}")
    fun updatePerson(@PathVariable id: Long, @RequestBody dto: PersonDto) = peopleService.updatePerson(id, dto)

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deletePerson(@PathVariable id: Long) = peopleService.deleteById(id)
}
