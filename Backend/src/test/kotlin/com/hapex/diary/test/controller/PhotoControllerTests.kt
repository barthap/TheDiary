package com.hapex.diary.test.controller

import com.hapex.diary.controller.PhotoController
import com.hapex.diary.data.model.Photo
import com.hapex.diary.service.PhotoService
import com.hapex.diary.test.utils.asJsonString
import com.nhaarman.mockito_kotlin.any
import com.nhaarman.mockito_kotlin.given
import com.nhaarman.mockito_kotlin.then
import com.nhaarman.mockito_kotlin.whenever
import org.hamcrest.Matchers
import org.hamcrest.Matchers.*
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mockito
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.core.io.FileSystemResource
import org.springframework.data.domain.PageImpl
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import org.springframework.security.crypto.keygen.KeyGenerators.string
import org.springframework.mock.web.MockMultipartFile
import java.io.File


@RunWith(SpringRunner::class)
@WebMvcTest(PhotoController::class, secure = false)
class PhotoControllerTests {
    @Autowired
    private lateinit var mockMvc: MockMvc
    @MockBean
    private lateinit var service: PhotoService

    @Test
    fun `return all photos test`() {
        val page = PageImpl<Photo>(listOf(
                Photo("Title", "file.jpg", "desc")
        ))
        given(service.getAllPhotoDetails(any()))
                .willReturn(page)

        mockMvc.perform(get("/photos"))
                .andExpect(status().isOk)
                .andExpect(header().longValue("X-Total-Count", 1))
                .andExpect(jsonPath("$", hasSize<Any>(1)))
                .andExpect(jsonPath("$[0].title").value("Title"))
    }

    @Test
    fun `fetch image test`() {
        given(service.getPhotoResource(any()))
                .willReturn(FileSystemResource(File("path/file.jpg")))

        mockMvc.perform(get("/photos/123"))
                .andExpect(status().isOk)
                .andExpect(header().string(HttpHeaders.CONTENT_TYPE, MediaType.IMAGE_JPEG_VALUE))
                .andExpect(header().string(HttpHeaders.CONTENT_DISPOSITION, endsWith("filename=file.jpg")))
    }

    @Test
    fun `get photo details test`() {
        given(service.findDetailsById(any()))
                .willReturn(Photo("Title", "file.jpg", "desc"))

        mockMvc.perform(get("/photos/123/details"))
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.filename").value("file.jpg"))
    }

    @Test
    fun `uplaod test`() {

        given(service.addPhoto(any(), any()))
                .willReturn(Photo("Uploaded", "filename.jpg", "Desc")
                        .apply { id=123 })

        val multipartFile = MockMultipartFile("file", "filename.jpg",
                MediaType.IMAGE_JPEG_VALUE, "Spring Framework".toByteArray())

        mockMvc.perform(multipart("/photos").file(multipartFile))
                .andExpect(status().isCreated)
                .andExpect(header().string("Location", endsWith("/photos/123")))

    }

    @Test
    fun `update details test`() {
        val photo = Photo("Title", "file.jpg", "desc")
        given(service.updatePhotoDetails(any(), any())).willReturn(photo)

        mockMvc.perform(put("/photos/123")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(photo)))
                .andExpect(status().isOk)
                .andExpect(jsonPath("$.filename").value("file.jpg"))
    }

    @Test
    fun `remove photo test`() {
        Mockito.doNothing().whenever(service).deletePhoto(any())

        mockMvc.perform(delete("/photos/123"))
                .andExpect(status().isNoContent)
    }
}
