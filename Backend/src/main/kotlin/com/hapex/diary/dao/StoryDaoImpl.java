package com.hapex.diary.dao;

import com.hapex.diary.model.EntityBase;
import com.hapex.diary.model.EntityType;
import com.hapex.diary.model.Story;
import com.hapex.diary.util.Utils;
import lombok.extern.apachecommons.CommonsLog;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@CommonsLog
@Service
@Transactional
public class StoryDaoImpl extends AbstractJdbcDao<Story, Long> implements StoryDao {

    @Autowired
    public StoryDaoImpl(JdbcTemplate jdbcTemplate, NamedParameterJdbcTemplate namedJdbc, DaoHelper helper) {
        super("Story",
                "StoryView",
                "StoryId",
                new StoryRowMapper(),
                jdbcTemplate,
                namedJdbc,
                helper);
    }


    @NotNull
    @Override
    public Story save(@NotNull Story story) {
        if(story.getId() > 0)
            updateStory(story);

        else createStory(story);

        return story;
    }

    private void createStory(Story story) {
        final String query
                = "insert into Story (StoryId, StoryDateTime, Header, Content) VALUES (:id, :date, :header, :content)";

        final EntityBase base = getDaoHelper().createEntityBase(EntityType.PERSON);

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("id", base.getId())
                .addValue("header", story.getHeader())
                .addValue("date",
                        Utils.dateTimeToDbStr(story.getHappenedDate().toDateTimeAtStartOfDay(), true))
                .addValue("content", story.getContent());

        getNamedJdbc().update(query, params);

        story.setCreatedDateTime(base.getCreatedDateTime());
        story.setUpdatedDateTime(base.getUpdatedDateTime());
        story.setId(base.getId());

    }

    private void updateStory(Story story) {
        final String query
                = "update Story SET Header=:header, StoryDateTime=:date, Content=:content WHERE StoryId=:id";

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("id", story.getId())
                .addValue("header", story.getHeader())
                .addValue("date",
                        Utils.dateTimeToDbStr(story.getHappenedDate().toDateTimeAtStartOfDay(), true))
                .addValue("content", story.getContent());

        getNamedJdbc().update(query, params);
    }
}
