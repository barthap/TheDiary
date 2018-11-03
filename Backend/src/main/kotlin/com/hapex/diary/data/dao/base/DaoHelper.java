package com.hapex.diary.data.dao.base;

import com.hapex.diary.data.model.EntityBase;
import com.hapex.diary.data.model.EntityType;
import com.hapex.diary.data.dao.reference.ReferenceDao;
import lombok.extern.apachecommons.CommonsLog;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.hapex.diary.util.Utils.dateTimeToDbStr;
import static com.hapex.diary.util.Utils.dbStrToDateTime;

@Component
@CommonsLog
public class DaoHelper {
    private final DataSource dataSource;
    private final ReferenceDao refDao;
    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public DaoHelper(DataSource dataSource, ReferenceDao refDao, NamedParameterJdbcTemplate jdbcTemplate) {
        this.dataSource = dataSource;
        this.refDao = refDao;
        this.jdbcTemplate = jdbcTemplate;
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
        log.debug("Created base entity with id: " + id.toString());
        return new EntityBase(id.longValue(), now, now, null, null);
    }

    public void updateEntityBase(EntityBase entity) {
        final String sql = "UPDATE Items SET UpdatedDateTime=:updated WHERE ItemId=:id";

        final DateTime now = DateTime.now();
        final String currentDateTime = dateTimeToDbStr(now);

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", entity.getId());
        params.addValue("updated", currentDateTime);

        jdbcTemplate.update(sql, params);
    }

    public void fillBaseEntity(EntityBase entity, ResultSet rs) throws SQLException {
        final long id = rs.getLong("Id");
        entity.setId(id);

        entity.setCreatedDateTime(dbStrToDateTime(rs.getString("CreatedDateTime")));
        entity.setUpdatedDateTime(dbStrToDateTime(rs.getString("UpdatedDateTime")));

        entity.setReferencedIn(refDao.findReferenceSources(id));
        entity.setReferencesTo(refDao.findReferenceTargets(id));

    }

    public boolean existsAll(Long... ids) {
        final int idCnt = ids.length;
        final String sql = "select count(ItemId) from Items where ItemId in (:ids)";

        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("ids", Stream.of(ids).collect(Collectors.toSet()));

        return jdbcTemplate.queryForObject(sql, parameters, Number.class).intValue() == idCnt;
    }

    public boolean existsAll(EntityBase... entities) {
        return this.existsAll(Stream.of(entities)
                .map(EntityBase::getId)
                .collect(Collectors.toList())
                .toArray(new Long[entities.length]));
    }
}
