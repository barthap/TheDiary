package com.hapex.diary.data.dao;

import com.hapex.diary.data.dao.base.DaoHelper;
import com.hapex.diary.data.model.Person;
import com.hapex.diary.util.Utils;
import org.jetbrains.annotations.NotNull;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by barthap on 18.10.2018.
 * No idea what to write here
 * *you know, no IDEA, IntelliJ IDEA xDDD
 */
public class PersonRowMapper implements RowMapper<Person> {

    private final DaoHelper daoHelper;

    PersonRowMapper(DaoHelper daoHelper) {
        this.daoHelper = daoHelper;
    }

    @NotNull
    @Override
    public Person mapRow(@NotNull ResultSet rs, int rowNum) throws SQLException {
        Person p = Person.builder()
                .birthDate(Utils.dbStrToDateTime(rs.getString("BirthDate"), true).toLocalDate())
                .description(rs.getString("Description"))
                .fullName(rs.getString("FullName"))
                .build();

        daoHelper.fillBaseEntity(p, rs);

        return p;
    }
}
