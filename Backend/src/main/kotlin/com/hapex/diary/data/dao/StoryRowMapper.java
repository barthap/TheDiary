package com.hapex.diary.data.dao;

import com.hapex.diary.data.dao.base.DaoHelper;
import com.hapex.diary.data.model.Story;
import com.hapex.diary.util.Utils;
import org.jetbrains.annotations.NotNull;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class StoryRowMapper implements RowMapper<Story> {

    private final DaoHelper daoHelper;

    StoryRowMapper(DaoHelper daoHelper) {
        this.daoHelper = daoHelper;
    }

    @NotNull
    @Override
    public Story mapRow(@NotNull ResultSet rs, int rowNum) throws SQLException {
        Story story = Story.builder()
                .happenedDate(Utils.dbStrToDateTime(rs.getString("StoryDateTime"), true).toLocalDate())
                .content(rs.getString("Content"))
                .header(rs.getString("Header"))
                .build();

        daoHelper.fillBaseEntity(story, rs);
        return story;
    }
}
