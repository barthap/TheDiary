package com.hapex.diary.controller

import com.hapex.diary.service.ReferenceService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/references", "/refs")
class ReferenceController(val referenceService: ReferenceService) {

    @PostMapping("/{source}-{target}")
    @ResponseStatus(HttpStatus.CREATED)
    fun postReference(@PathVariable source: Long, @PathVariable target: Long)
            = referenceService.createReference(source, target)

    @DeleteMapping("/{refId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteReference(@PathVariable refId: Long)
            = referenceService.removeReference(refId)
}