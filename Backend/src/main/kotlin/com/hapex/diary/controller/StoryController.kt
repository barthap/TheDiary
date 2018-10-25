package com.hapex.diary.controller

import com.hapex.diary.dto.StoryDto
import com.hapex.diary.service.StoryService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/story")
class StoryController(@Autowired val storyService: StoryService) {

    @GetMapping
    fun getAllStories(pageable: Pageable) = storyService.findAll(pageable)

    @GetMapping("/{id}")
    fun getStoryById(@PathVariable id: Long) = storyService.findById(id)

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun addStory(@RequestBody dto: StoryDto) = storyService.addStory(dto)

    @PutMapping("/{id}")
    fun updateStory(@PathVariable id: Long, @RequestBody dto: StoryDto)
            = storyService.updateStory(id, dto)

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteStory(@PathVariable id: Long) = storyService.deleteById(id)
}
