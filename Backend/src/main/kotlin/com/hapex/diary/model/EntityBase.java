package com.hapex.diary.model;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.joda.time.DateTime;

import java.util.Date;


/**
 * Maps Items table in database
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
public class EntityBase {
    protected long id;
    protected DateTime createdDateTime;
    protected DateTime updatedDateTime;

    @JsonGetter("createdDateTime")
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date createdAt() { return createdDateTime != null ? createdDateTime.toDate() : new Date(0); }

    @JsonGetter("updatedDateTime")
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date updatedAt() { return updatedDateTime != null ? updatedDateTime.toDate() : new Date(0); }

    //copy constructor for derived entities
    public void updateBase(EntityBase b) {
        this.id = b.getId();
        this.createdDateTime = b.getCreatedDateTime();
        this.updatedDateTime = b.getUpdatedDateTime();
    }
}
