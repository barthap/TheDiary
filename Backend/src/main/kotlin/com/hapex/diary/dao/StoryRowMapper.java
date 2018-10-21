package com.hapex.diary.dao;

import com.hapex.diary.model.Story;
import com.hapex.diary.util.Utils;
import org.jetbrains.annotations.NotNull;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class StoryRowMapper implements RowMapper<Story> {

    @NotNull
    @Override
    public Story mapRow(@NotNull ResultSet rs, int rowNum) throws SQLException {
        Story story = Story.builder()
                .happenedDate(Utils.dbStrToDateTime(rs.getString("StoryDateTime"), true).toLocalDate())
                .content(rs.getString("Content"))
                .header(rs.getString("Header"))
                .build();

        DaoHelper.fillBaseEntity(story, rs);
        return story;
    }
}
