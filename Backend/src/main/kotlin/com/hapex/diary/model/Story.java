package com.hapex.diary.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.hapex.diary.dto.StoryDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.joda.time.DateTime;
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

    public Story(LocalDate happenedDate, String header, String content) {
        this.happenedDate = happenedDate;
        this.header = header;
        this.content = content;
    }

    private String header;
    private String content;

    public void updateFromDto(StoryDto dto) {
        this.content = dto.getContent();
        this.happenedDate = new LocalDate(new Date(dto.getHappenedDate()));
        this.header = dto.getHeader();
        this.updatedDateTime = DateTime.now();
    }
}
