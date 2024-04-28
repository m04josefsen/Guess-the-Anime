package org.guesstheanime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
public class Anime {

    @Id
    private Integer malId;
    private String titleOriginal;
    private String titleEnglish;
    private Integer releaseYear;
    private String url;
    private String imageUrl;

    public Anime(Integer malId, String titleOriginal, String titleEnglish, Integer releaseYear, String url, String imageUrl) {
        this.malId = malId;
        this.titleOriginal = titleOriginal;
        this.titleEnglish = titleEnglish;
        this.releaseYear = releaseYear;
        this.url = url;
        this.imageUrl = imageUrl;
    }

    public Anime(){}

    public Integer getMalId() {
        return malId;
    }

    public void setMalId(Integer malId) {
        this.malId = malId;
    }

    public String getTitleOriginal() {
        return titleOriginal;
    }

    public void setTitleOriginal(String titleOriginal) {
        this.titleOriginal = titleOriginal;
    }

    public String getTitleEnglish() {
        return titleEnglish;
    }

    public void setTitleEnglish(String titleEnglish) {
        this.titleEnglish = titleEnglish;
    }

    public Integer getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(Integer releaseYear) {
        this.releaseYear = releaseYear;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
