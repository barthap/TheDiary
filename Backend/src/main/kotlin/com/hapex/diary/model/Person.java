package com.hapex.diary.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.joda.time.DateTime;
import org.joda.time.LocalDate;

import java.util.Date;

/**
 * Created by barthap on 18.10.2018.
 * No idea what to write here
 * *you know, no IDEA, IntelliJ IDEA xDDD
 */

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@AllArgsConstructor
public class Person extends EntityBase{
    private String fullName;
    private String description;
    private LocalDate birthDate;

    @JsonGetter("birthDate")
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date serializedBirthdate() { return birthDate.toDate(); }
}
