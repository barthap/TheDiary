package com.hapex.diary.data.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.hapex.diary.data.dto.PersonDto;
import lombok.*;
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
public class Person extends EntityBase{
    private String fullName;
    private String description;
    private LocalDate birthDate;

    @JsonGetter("birthDate")
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date serializedBirthdate() { return birthDate.toDate(); }

    public Person(String fullName, String description, LocalDate birthDate) {
        this.fullName = fullName;
        this.description = description;
        this.birthDate = birthDate;
    }

    public void updateFromDto(PersonDto dto) {
        this.birthDate = new LocalDate(new Date(dto.getBirthDate()));
        this.fullName = dto.getFullName();
        this.description = dto.getDescription();
        this.updatedDateTime = DateTime.now();

        /*
        return peopleDao.save(person.apply {
            this.fullName = dto.fullName
            this.birthDate = LocalDate(Date(dto.birthDate))
            this.description = dto.description
            this.updatedDateTime = DateTime.now()
        })
         */
    }
}
