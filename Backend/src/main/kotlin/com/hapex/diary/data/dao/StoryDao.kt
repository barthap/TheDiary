package com.hapex.diary.data.dao

import com.hapex.diary.data.dao.base.PagingAndSortingDao
import com.hapex.diary.data.model.Story

interface StoryDao : PagingAndSortingDao<Story, Long>
