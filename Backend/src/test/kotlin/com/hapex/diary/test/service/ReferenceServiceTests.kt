package com.hapex.diary.test.service

import com.hapex.diary.data.dao.base.DaoHelper
import com.hapex.diary.data.dao.reference.ReferenceDao
import com.hapex.diary.service.ReferenceService
import com.hapex.diary.test.utils.randId
import com.hapex.diary.util.exception.http.InvalidRequestException
import com.nhaarman.mockito_kotlin.any
import com.nhaarman.mockito_kotlin.anyVararg
import com.nhaarman.mockito_kotlin.given
import com.nhaarman.mockito_kotlin.whenever
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mock
import org.mockito.Mockito
import org.mockito.junit.MockitoJUnitRunner

@RunWith(MockitoJUnitRunner::class)
class ReferenceServiceTests {
    @Mock private lateinit var refDao: ReferenceDao
    @Mock private lateinit var daoHelper: DaoHelper

    private lateinit var service: ReferenceService

    @Before
    fun setUp() {
        service = ReferenceService(refDao, daoHelper)
    }

    @Test
    fun `create reference test`() {
        given(daoHelper.existsAll(anyVararg<Long>())).willReturn(true)
        Mockito.doNothing().whenever(refDao).createReference(any(), any())

        //just check if no errors, no aditional service logic yet
        service.createReference(randId(), randId())
    }

    @Test(expected = InvalidRequestException::class)
    fun `create invalid reference test`() {
        given(daoHelper.existsAll(anyVararg<Long>())).willReturn(false)

        service.createReference(randId(), randId())
    }

    @Test
    fun `remove reference test`() {
        //no logic here, empty
    }
}