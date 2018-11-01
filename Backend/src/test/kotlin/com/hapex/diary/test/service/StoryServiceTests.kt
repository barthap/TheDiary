package com.hapex.diary.test.service

import com.hapex.diary.data.dao.StoryDao
import com.hapex.diary.data.dto.StoryDto
import com.hapex.diary.data.model.Story
import com.hapex.diary.service.StoryService
import com.hapex.diary.test.utils.randId
import com.hapex.diary.util.exception.http.InvalidRequestException
import com.hapex.diary.util.exception.http.ResourceNotFoundException
import com.nhaarman.mockito_kotlin.any
import com.nhaarman.mockito_kotlin.eq
import com.nhaarman.mockito_kotlin.given
import org.assertj.core.api.Assertions.assertThat
import org.joda.time.LocalDate
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mock
import org.mockito.junit.MockitoJUnitRunner
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import java.util.*

@RunWith(MockitoJUnitRunner::class)
class StoryServiceTests {
    @Mock
    private lateinit var dao: StoryDao

    private lateinit var service: StoryService

    @Before
    fun setUp() {
        service = StoryService(dao)
    }

    @Test
    fun `get all stories test`() {
        //The test is empty because the service has no additional logic for now
        //No need to test copied dao logic

        /*val page = PageImpl<Story>(emptyList());
        given(dao.findAll(any<Pageable>())).willReturn(page)

        val result = service.findAll(Pageable.unpaged())

        assertThat(result.totalElements).isEqualTo(page.totalElements)
        */
    }

    @Test
    fun `get story details`() {
        val id = randId()
        given(dao.findById(eq(id))).willReturn(Story(LocalDate.now(), "head", "content"))

        assertThat(service.findById(id).header).isEqualTo("head")
    }

    //forks also for delete
    @Test(expected = ResourceNotFoundException::class)
    fun `not found exception test`() {

        given(dao.findById(any())).willReturn(null)

        service.findById(randId())
    }

    @Test
    fun `add story test`() {
        given(dao.save(any())).will { it.arguments[0] }

        val dto = StoryDto(Date().time, "Header 1", "Content 12")
        val result = service.addStory(dto)

        assertThat(result.header).isEqualTo(dto.header)
        assertThat(result.content).isEqualTo(dto.content)
    }

    //works also for update
    @Test(expected = InvalidRequestException::class)
    fun `add invalid story`() {
        service.addStory(StoryDto(Date().time, "Empty content", ""))
    }

    @Test
    fun `update story test`() {
        val dto = StoryDto(Date().time, "Header 1", "Content 12")
        val story = Story(LocalDate.now(), dto.header, dto.content)

        given(dao.findById(any())).willReturn(story)
        given(dao.save(any())).will { it.arguments[0] }

        val result = service.updateStory(randId(), dto)

        assertThat(result.content).isEqualTo(dto.content)
        assertThat(result.header).isEqualTo(dto.header)
    }

}