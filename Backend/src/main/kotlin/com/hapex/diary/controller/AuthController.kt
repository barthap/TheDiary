package com.hapex.diary.controller

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.userdetails.User
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.security.Principal

@RestController
//@RequestMapping("/uaa")   //leave it just as is
class AuthController {
    @GetMapping(path=["/user", "/me"])
    fun userInfo(principal: Principal) = PrincipalDto.fromPrincipal(principal)

    data class PrincipalDto(val username: String) {
        companion object {
            fun fromPrincipal(principal: Any): PrincipalDto {
                if (principal is UsernamePasswordAuthenticationToken)
                    return PrincipalDto(principal.name)


                return PrincipalDto(principal.toString())
            }
        }
    }
}