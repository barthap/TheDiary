package com.hapex.diary.test.service

import com.hapex.diary.data.dao.PeopleDao
import com.hapex.diary.data.dto.PersonDto
import com.hapex.diary.data.model.Person
import com.hapex.diary.service.PeopleService
import com.hapex.diary.test.utils.randId
import com.hapex.diary.util.exception.http.InvalidRequestException
import com.hapex.diary.util.exception.http.ResourceNotFoundException
import com.nhaarman.mockito_kotlin.any
import com.nhaarman.mockito_kotlin.eq
import com.nhaarman.mockito_kotlin.given
import org.assertj.core.api.Assertions
import org.assertj.core.api.Assertions.assertThat
import org.joda.time.LocalDate
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mock
import org.mockito.junit.MockitoJUnitRunner
import java.util.*

@RunWith(MockitoJUnitRunner::class)
class PersonServiceTests {
    @Mock private lateinit var dao: PeopleDao

    private lateinit var service: PeopleService

    @Before
    fun setUp() {
        service = PeopleService(dao)
    }

    @Test
    fun `find details test`() {
        val id = randId()
        val person = Person("John Smith", "desc", LocalDate.now())
        given(dao.findById(eq(id))).willReturn(person)

        val result = service.findById(id)

        Assertions.assertThat(result.fullName).isEqualTo(person.fullName)
        Assertions.assertThat(result.description).isEqualTo(person.description)
    }

    @Test(expected = ResourceNotFoundException::class)
    fun `not found test`() {
        given(dao.findById(any())).willReturn(null)

        service.findById(randId())
    }

    @Test
    fun `update person test`() {
        val dto = PersonDto("John Smith", "desc", Date().time)
        val person = Person(dto.fullName, dto.description, LocalDate.now())

        given(dao.findById(any())).willReturn(person)
        given(dao.save(any())).will { it.arguments[0] }

        val result = service.updatePerson(randId(), dto)

        assertThat(result.fullName).isEqualTo(dto.fullName)
        assertThat(result.description).isEqualTo(dto.description)
    }

    @Test(expected = InvalidRequestException::class)
    fun `create invalid test`() {
        val dto = PersonDto(" ", "Empty name", Date().time)

        service.addPerson(dto)
    }
}