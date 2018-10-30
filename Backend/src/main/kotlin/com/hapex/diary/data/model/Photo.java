package com.hapex.diary.data.model;

import com.hapex.diary.data.dto.PhotoDto;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.joda.time.DateTime;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@NoArgsConstructor
public class Photo extends EntityBase {

    private String title;
    private String filename;
    private String description;

    public Photo(String title, String filename, String description) {
        this.title = title;
        this.filename = filename;
        this.description = description;
    }


    public void updateFromDto(PhotoDto dto) {
        this.title = dto.getTitle();
        this.description = dto.getDescription();
        this.updatedDateTime = DateTime.now();
    }


    //F*** Kotlin!
    //Lombok :(
    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getFilename() {
        return filename;
    }

    public String getDescription() {
        return description;
    }
}
