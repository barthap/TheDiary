package com.hapex.diary.dao;

import com.hapex.diary.model.EntityBase;
import com.hapex.diary.model.EntityType;
import com.hapex.diary.model.Person;
import com.hapex.diary.util.Utils;
import lombok.extern.apachecommons.CommonsLog;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by barthap on 18.10.2018.
 * No idea what to write here
 * *you know, no IDEA, IntelliJ IDEA xDDD
 */

@CommonsLog
@Service
@Transactional
public class PeopleDaoImpl extends AbstractJdbcDao<Person, Long> implements PeopleDao{

    @Autowired
    public PeopleDaoImpl(JdbcTemplate jdbcTemplate, NamedParameterJdbcTemplate namedJdbc, DaoHelper helper) {
        super("People",
                "PersonView",
                "PersonId",
                new PersonRowMapper(),
                jdbcTemplate,
                namedJdbc,
                helper);
    }


    @NotNull
    @Override
    public Person save(@NotNull Person person) {
        if(person.getId() > 0)
            updatePerson(person);

        else createPerson(person);

        return person;
    }


    private void createPerson(Person person) {
        final EntityBase base = getDaoHelper().createEntityBase(EntityType.PERSON);
        person.updateBase(base);

        final String query
                = "insert into People (PersonId, FullName, BirthDate, Description) values (:id, :name, :birthDate, :description)";

        executeSave(query, person);
    }

    private void updatePerson(Person person) {
        final String query
                = "update People SET FullName=:name, BirthDate=:birthDate, Description=:description WHERE PersonId=:id";

        executeSave(query, person);
    }

    private void executeSave(String sql, Person person) {
        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("id", person.getId())
                .addValue("name", person.getFullName())
                .addValue("birthDate", Utils.dateTimeToDbStr(person.getBirthDate().toDateTimeAtCurrentTime(), true))
                .addValue("description", person.getDescription());

        getNamedJdbc().update(sql, params);
    }
}
