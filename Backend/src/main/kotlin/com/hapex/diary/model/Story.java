package com.hapex.diary.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonGetter;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.joda.time.LocalDate;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
public class Story extends EntityBase {

    private LocalDate happenedDate;

    @JsonGetter("happenedDate")
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date serializeDate() { return happenedDate.toDate();}

    private String header;
    private String content;
}
