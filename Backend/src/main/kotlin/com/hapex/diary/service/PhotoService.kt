package com.hapex.diary.service

import com.hapex.diary.data.dao.PhotoDao
import com.hapex.diary.data.dto.PhotoDto
import com.hapex.diary.data.model.Photo
import com.hapex.diary.service.storage.StorageService
import com.hapex.diary.util.exception.http.InvalidRequestException
import com.hapex.diary.util.exception.http.ResourceNotFoundException
import org.springframework.core.io.Resource
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile

@Service
class PhotoService(private val storageService: StorageService,
                   private val photoDao: PhotoDao) {

    fun getAllPhotoDetails(pageable: Pageable) = photoDao.findAll(pageable);

    fun findDetailsById(id: Long) = photoDao.findById(id) ?: throwNotFound(id)

    fun addPhoto(file: MultipartFile, details: PhotoDto): Photo {
        validateDto(details)

        val originalName: String
                = file.originalFilename ?: throw RuntimeException("Could not load filename")
        //val extension = originalName.substring(originalName.lastIndexOf('.'))

        if(!storageService.store(file, originalName))
            throw RuntimeException("Failed to save photo: ${originalName}")

        val photo = Photo(details.title, originalName, details.description)

        return photoDao.save(photo)


    }

    fun getPhotoResource(id: Long): Resource {
        val photo = photoDao.findById(id) ?: throwNotFound(id)
        return storageService.loadAsResource(photo.filename)
    }

    fun updatePhotoDetails(id: Long, details: PhotoDto): Photo {
        validateDto(details)
        val photo = findDetailsById(id)
        photo.updateFromDto(details)
        return photoDao.save(photo)
    }

    fun deletePhoto(id: Long) {
        val details = photoDao.findById(id) ?: throwNotFound(id)
        storageService.delete(details.filename)
        photoDao.deleteById(id)
    }

    private fun throwNotFound(id: Long): Nothing = throw ResourceNotFoundException("Photo with id=$id not found!")

    private fun validateDto(dto: PhotoDto) {
        if(dto.title.isBlank())
            throw InvalidRequestException("Photo title cannot be blank")
    }

}