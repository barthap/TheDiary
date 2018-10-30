package com.hapex.diary.test.service

import com.hapex.diary.data.dao.PhotoDao
import com.hapex.diary.data.model.Photo
import com.hapex.diary.service.PhotoService
import com.hapex.diary.service.storage.StorageService
import com.hapex.diary.test.utils.randId
import com.hapex.diary.util.exception.http.ResourceNotFoundException
import com.nhaarman.mockito_kotlin.any
import com.nhaarman.mockito_kotlin.eq
import com.nhaarman.mockito_kotlin.given
import org.assertj.core.api.Assertions.assertThat
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mock
import org.mockito.junit.MockitoJUnitRunner

@RunWith(MockitoJUnitRunner::class)
class PhotoServiceTests {
    @Mock private lateinit var storageService: StorageService
    @Mock private lateinit var photoDao: PhotoDao

    private lateinit var service: PhotoService

    @Before
    fun setUp() {
        service = PhotoService(storageService, photoDao)
    }

    @Test
    fun `get all photos test`() {
        //empty, no logic
    }

    @Test
    fun `find details test`() {
        val id = randId()
        val photo = Photo("Title", "file.jpg", "desc")
        given(photoDao.findById(eq(id))).willReturn(photo)

        val result = service.findDetailsById(id)

        assertThat(result.description).isEqualTo(photo.description)
        assertThat(result.filename).isEqualTo(photo.filename)
        assertThat(result.title).isEqualTo(photo.title)
    }

    @Test(expected = ResourceNotFoundException::class)
    fun `not found test`() {
        given(photoDao.findById(any())).willReturn(null)

        service.findDetailsById(randId())
    }

    //TODO: Finish tests

    @Test
    fun `update photo test`() {

    }

    @Test
    fun `delete photo test`() {

    }
}