package com.hapex.diary.service

import com.hapex.diary.dao.StoryDao
import com.hapex.diary.dto.StoryDto
import com.hapex.diary.model.Story
import com.hapex.diary.util.exception.http.ResourceNotFoundException
import org.joda.time.DateTime
import org.joda.time.LocalDate
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import java.util.*

@Service
class StoryService(@Autowired private val dao: StoryDao) {

    fun findAll(pageable: Pageable) = dao.findAll(pageable)
    fun findById(id: Long): Story = dao.findById(id) ?: throw ResourceNotFoundException("Story with id=$id not found!")

    fun addStory(dto: StoryDto): Story {
        val story = Story(LocalDate(Date(dto.happenedDate)), dto.header, dto.content)
        return dao.save(story);
    }
    fun updateStory(id: Long, dto: StoryDto): Story {
        val story = findById(id)
        story.updateFromDto(dto)
        return dao.save(story)
        /*return dao.save(story.apply {
            this.happenedDate = LocalDate(Date(dto.happenedDate))
            this.content = dto.content
            this.header = dto.header
            this.updatedDateTime = DateTime.now()
        })*/
    }

    fun deleteById(id: Long) = dao.deleteById(id)

    //TODO: Add validation and other business logic
}
