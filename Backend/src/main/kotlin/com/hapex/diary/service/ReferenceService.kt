package com.hapex.diary.service

import com.hapex.diary.data.dao.base.DaoHelper
import com.hapex.diary.data.dao.reference.ReferenceDao
import com.hapex.diary.util.exception.http.InvalidRequestException
import org.springframework.stereotype.Service

@Service
class ReferenceService(val refDao: ReferenceDao,
                       val daoHelper: DaoHelper) {

    fun createReference(sourceId: Long, targetId: Long) {
        if(!daoHelper.existsAll(sourceId, targetId))
            throw InvalidRequestException("Cannot create reference. " +
                    "Invalid source and/or target entity id!")

        return refDao.createReference(sourceId, targetId)
    }


    fun removeReference(referenceId: Long) = refDao.removeReference(referenceId)
}