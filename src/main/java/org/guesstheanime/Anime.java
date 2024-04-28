package org.guesstheanime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Anime {

    @Id
    private Integer malId;
    private String titleOriginal;
    private String titleEnglish;
    private Integer releaseYear;
    private String url;
    private String imageUrl;
}
