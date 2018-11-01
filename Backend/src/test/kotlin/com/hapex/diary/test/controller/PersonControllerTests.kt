package com.hapex.diary.test.controller

import com.hapex.diary.controller.PeopleController
import com.hapex.diary.data.dto.PersonDto
import com.hapex.diary.data.model.Person
import com.hapex.diary.service.PeopleService
import com.hapex.diary.test.utils.asJsonString
import com.hapex.diary.util.exception.http.ResourceNotFoundException
import com.nhaarman.mockito_kotlin.any
import com.nhaarman.mockito_kotlin.given
import com.nhaarman.mockito_kotlin.whenever
import com.nhaarman.mockito_kotlin.willThrow
import org.hamcrest.Matchers.hasSize
import org.joda.time.LocalDate
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mockito
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.http.MediaType
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

@RunWith(SpringRunner::class)
@WebMvcTest(PeopleController::class, secure = false)
class PersonControllerTests {
    @Autowired private lateinit var mockMvc: MockMvc

    @MockBean private lateinit var service: PeopleService

    @Test
    fun `get all people test`() {
        val page = PageImpl<Person>(listOf(
                Person("John Smith", "Desc", LocalDate.now())
        ))
        given(service.findAll(any<Pageable>())).willReturn(page)

        mockMvc.perform(get("/people"))
                .andExpect(status().isOk)
                .andExpect(header().longValue("X-Total-Count", 1))
                .andExpect(jsonPath("$", hasSize<Any>(1)))
                .andExpect(jsonPath("$[0].fullName").value("John Smith"))
    }

    @Test
    fun `get single person details`() {
        given(service.findById(any()))
                .willReturn(Person("John Smith", "", LocalDate.now()))

        mockMvc.perform(get("/people/123"))
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.fullName").value("John Smith"))
    }

    @Test   //works for get, put, delete
    fun `should return 404 when person not found`() {
        given(service.findById(any())).willThrow { ResourceNotFoundException("") }

        mockMvc.perform(get("/people/1234"))
                .andExpect(status().isNotFound)
    }

    @Test
    fun `add person test`() {
        val person = Person("John Smith", "", LocalDate.now())
        given(service.addPerson(any())).willReturn(person)

        mockMvc.perform(post("/people")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(person))) //should be DTO
                .andExpect(status().isCreated)
                .andExpect(jsonPath("$.fullName").value("John Smith"))
    }

    @Test
    fun `update person test`() {
        val person = Person("Updated Smith", "", LocalDate.now())
        given(service.updatePerson(any(), any())).willReturn(person)

        mockMvc.perform(put("/people/123")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(person))) //should be DTO
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.fullName").value("Updated Smith"))
    }

    @Test
    fun `remove person test`() {
        Mockito.doNothing().whenever(service).deleteById(any())

        mockMvc.perform(delete("/people/1234"))
                .andExpect(status().isNoContent)
    }
}