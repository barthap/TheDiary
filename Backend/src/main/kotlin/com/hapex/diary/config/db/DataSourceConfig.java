package com.hapex.diary.config.db;

import lombok.extern.apachecommons.CommonsLog;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
@CommonsLog
public class DataSourceConfig {
    @Value("${database.filename:UNKNOWN}")
    private String databaseFilename;

    @Bean
    public DataSource dataSource() {
        if(databaseFilename == null || databaseFilename.equals("UNKNOWN")) {
            IllegalStateException ex = new IllegalStateException("Database file is not selected! " +
                    "Check your application.properties and set database.filename properly.");
            log.error("SQLite connection error: " + ex.getMessage());
            throw ex;
        }

        log.info("Connecting to SQLite database: " + databaseFilename);

        DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.driverClassName("org.sqlite.JDBC");
        dataSourceBuilder.url(String.format("jdbc:sqlite:%s", databaseFilename));
        return dataSourceBuilder.build();
    }
}
