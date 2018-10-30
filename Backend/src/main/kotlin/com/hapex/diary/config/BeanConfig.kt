package com.hapex.diary.config

import com.hapex.diary.service.storage.FileSystemStorageService
import com.hapex.diary.service.storage.StorageService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class BeanConfig {

    @Bean
    fun storageService(): StorageService = FileSystemStorageService()
}
