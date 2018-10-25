package com.hapex.diary.test.controller

import com.hapex.diary.controller.PeopleController
import com.hapex.diary.dao.PeopleDao
import com.hapex.diary.dto.PersonDto
import com.hapex.diary.model.Person
import com.hapex.diary.service.PeopleService
import com.nhaarman.mockito_kotlin.any
import com.nhaarman.mockito_kotlin.given
import com.nhaarman.mockito_kotlin.willReturn
import org.hamcrest.Matchers.hasSize
import org.joda.time.LocalDate
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

@RunWith(SpringRunner::class)
@WebMvcTest(PeopleController::class, secure = false)
class PersonControllerTests {
    @Autowired private lateinit var mockMvc: MockMvc

    @MockBean private lateinit var service: PeopleService

    @Test
    fun `get all people test`() {
        val page = PageImpl<Person>(listOf(
                Person("Eustachy", "Desc", LocalDate.now())
        ))
        given(service.findAll(any<Pageable>())).willReturn(page)

        mockMvc.perform(get("/people"))
                .andExpect(status().isOk)
                .andExpect(header().longValue("X-Total-Count", 1))
                .andExpect(jsonPath("$", hasSize<Any>(1)))
                .andExpect(jsonPath("$[0].fullName").value("Eustachy"))
    }

    @Test
    fun `get single person details`() {
        TODO("Test not implemented!")
    }

    @Test
    fun `should return 404 when person not found`() {
        TODO("Test not implemented!")
    }

    @Test
    fun `add person test`() {
        TODO()
    }
}