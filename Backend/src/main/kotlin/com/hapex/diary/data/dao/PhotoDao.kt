package com.hapex.diary.data.dao

import com.hapex.diary.data.dao.base.PagingAndSortingDao
import com.hapex.diary.data.model.Photo

interface PhotoDao : PagingAndSortingDao<Photo, Long>
