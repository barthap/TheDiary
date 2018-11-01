package com.hapex.diary.util.exception.http

import java.lang.RuntimeException

class ResourceNotFoundException(message: String?) : RuntimeException(message)