package com.hapex.diary.controller.helper

import org.springframework.http.converter.HttpMessageConverter
import org.springframework.core.MethodParameter
import org.springframework.http.MediaType
import org.springframework.http.server.ServerHttpRequest
import org.springframework.http.server.ServerHttpResponse
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice
import org.springframework.web.bind.annotation.RestControllerAdvice

//@see https://stackoverflow.com/questions/44375435/spring-auto-add-x-total-count-header

@RestControllerAdvice
class CollectionResourceSizeAdvice : ResponseBodyAdvice<Collection<*>> {


    override fun supports(returnType: MethodParameter, converterType: Class<out HttpMessageConverter<*>>): Boolean {
        //Checks if this advice is applicable.
        //In this case it applies to any endpoint which returns a page.
        return Collection::class.java.isAssignableFrom(returnType.parameterType)
    }

    override fun beforeBodyWrite(body: Collection<*>?,
                                 returnType: MethodParameter,
                                 selectedContentType: MediaType,
                                 selectedConverterType: Class<out HttpMessageConverter<*>>,
                                 request: ServerHttpRequest,
                                 response: ServerHttpResponse
            ): Collection<*>? {

        response.headers.add("X-Total-Count", body?.size.toString())
        return body
    }
}