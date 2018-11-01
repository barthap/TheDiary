package com.hapex.diary.data.dao

import com.hapex.diary.data.dao.base.PagingAndSortingDao
import com.hapex.diary.data.model.Person


interface PeopleDao : PagingAndSortingDao<Person, Long>
