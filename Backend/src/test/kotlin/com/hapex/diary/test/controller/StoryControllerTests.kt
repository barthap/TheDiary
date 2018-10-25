package com.hapex.diary.test.controller

import com.hapex.diary.controller.StoryController
import com.hapex.diary.model.Story
import com.hapex.diary.service.StoryService
import com.hapex.diary.util.exception.http.ResourceNotFoundException
import com.nhaarman.mockito_kotlin.any
import com.nhaarman.mockito_kotlin.given
import com.nhaarman.mockito_kotlin.willThrow
import org.hamcrest.Matchers.*
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
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

@RunWith(SpringRunner::class)
@WebMvcTest(StoryController::class, secure = false)
class StoryControllerTests {
    @Autowired private lateinit var mockMvc: MockMvc
    @MockBean private lateinit var service: StoryService

    @Test
    fun `should return all stories`() {
        val page = PageImpl<Story>(listOf(
                Story(LocalDate.now(), "Story Header", "Story Content")
        ))
        given(service.findAll(any<Pageable>())).willReturn(page)

        mockMvc.perform(get("/story"))
                .andExpect(status().isOk)
                .andExpect(header().longValue("X-Total-Count", 1))
                .andExpect(jsonPath("$", hasSize<Any>(1)))
                .andExpect(jsonPath("$[0].header").value("Story Header"))
    }


    @Test
    fun `should load single story`() {
        given(service.findById(123))
                .willReturn(Story(LocalDate.now(), "Story Header", "Story Content"))

        mockMvc.perform(get("/story/123"))
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.header").value("Story Header"))
    }

    @Test
    fun `should return 404 when story not found`() {
        given(service.findById(any())).willThrow { ResourceNotFoundException("") }

        mockMvc.perform(get("/story/321"))
                .andExpect(status().isNotFound)
    }
}