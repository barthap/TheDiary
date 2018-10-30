package com.hapex.diary.controller

import com.hapex.diary.data.dto.PhotoDto
import com.hapex.diary.service.PhotoService
import org.springframework.core.io.Resource
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder
import java.net.URI

@RestController
@RequestMapping("/photos")
class PhotoController(private val service: PhotoService) {

    @GetMapping
    fun getAllPhotosDetails(pageable: Pageable) = service.getAllPhotoDetails(pageable)


    @GetMapping("/{id}", produces = [MediaType.IMAGE_JPEG_VALUE])
    fun getPhotoResource(@PathVariable id: Long): ResponseEntity<Resource> {
        val photo: Resource = service.getPhotoResource(id)

        return ResponseEntity
                .ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=${photo.filename}")
                .body(photo)
    }

    @GetMapping("/{id}/details")
    fun getPhotoDetails(@PathVariable id: Long) = service.findDetailsById(id)

    @PostMapping(consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun uploadPhoto(@RequestParam("file") file: MultipartFile,
                    @RequestParam("title") title: String?): ResponseEntity<Unit> {

        val cTitle = title ?: "Untitled";

        val photo = service.addPhoto(file, PhotoDto(cTitle, "_Add photo description..._"))

        val location: URI = MvcUriComponentsBuilder
                .fromMethodName(PhotoController::class.java,
                        "getPhotoResource", photo.id)
                .build().toUri();

        val headers = HttpHeaders()
        headers.location = location
        return ResponseEntity(headers, HttpStatus.CREATED)

    }

    @PutMapping("/{id}", "/{id}/details")
    fun updatePhotoDetails(@PathVariable id: Long, @RequestBody details: PhotoDto)
            = service.updatePhotoDetails(id, details)

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deletePhoto(@PathVariable id: Long) = service.deletePhoto(id)
}