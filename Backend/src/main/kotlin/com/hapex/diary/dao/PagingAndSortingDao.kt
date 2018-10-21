package com.hapex.diary.dao

import com.hapex.diary.model.EntityBase
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort

import java.io.Serializable

interface PagingAndSortingDao<T : EntityBase, ID : Serializable>
    : Dao<T, ID> {

    fun findAll(sort: Sort): Collection<T>
    fun findAll(pageable: Pageable): Page<T>
}
