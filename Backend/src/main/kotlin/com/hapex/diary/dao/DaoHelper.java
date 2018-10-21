package com.hapex.diary.dao;

import com.hapex.diary.model.EntityBase;
import com.hapex.diary.model.EntityType;
import com.hapex.diary.util.Utils;
import lombok.extern.apachecommons.CommonsLog;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.hapex.diary.util.Utils.dateTimeToDbStr;
import static com.hapex.diary.util.Utils.dbStrToDateTime;

@Component
@CommonsLog
public class DaoHelper {
    private final DataSource dataSource;

    @Autowired
    public DaoHelper(DataSource dataSource) {
        this.dataSource = dataSource;
    }
    /**
     *
     * @param type Type of entity to create
     * @return created ID
     */
    public EntityBase createEntityBase(EntityType type) {
        SimpleJdbcInsert baseInsert = new SimpleJdbcInsert(dataSource)
                .withTableName("Items")
                .usingGeneratedKeyColumns("ItemId");

        final DateTime now = DateTime.now();
        final String currentDateTime = dateTimeToDbStr(now);

        Map<String, Object> params = new HashMap<>();
        params.put("TypeCode", type.getCode());
        params.put("CreatedDateTime", currentDateTime);
        params.put("UpdatedDateTime", currentDateTime);

        Number id = baseInsert.executeAndReturnKey(params);
        log.info("Created base entity with id: " + id.toString());
        return new EntityBase(id.longValue(), now, now);
    }


    public static void fillBaseEntity(EntityBase entity, ResultSet rs) throws SQLException {
        entity.setId(rs.getInt("Id"));

        entity.setCreatedDateTime(dbStrToDateTime(rs.getString("CreatedDateTime")));
        entity.setUpdatedDateTime(dbStrToDateTime(rs.getString("UpdatedDateTime")));

    }
}
