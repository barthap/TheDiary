package com.hapex.diary.controller.helper

import com.hapex.diary.util.exception.http.InvalidRequestException
import com.hapex.diary.util.exception.http.ResourceNotFoundException
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler
import java.lang.RuntimeException

@RestControllerAdvice
class ExceptionHandlersAdvice : ResponseEntityExceptionHandler() {

    @ExceptionHandler(ResourceNotFoundException::class)
    fun handleNotFound(ex: RuntimeException, request: WebRequest): ResponseEntity<Any>
            = handleExceptionInternal(ex, "Error: " + ex.message, HttpHeaders(), HttpStatus.NOT_FOUND, request)


    @ExceptionHandler(InvalidRequestException::class)
    fun handleInvalidException(ex: RuntimeException, request: WebRequest): ResponseEntity<Any>
            = handleExceptionInternal(ex, "Error: " + ex.message, HttpHeaders(), HttpStatus.BAD_REQUEST, request)
}