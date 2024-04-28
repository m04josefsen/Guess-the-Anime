package org.guesstheanime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnimeController {

    @Autowired
    AnimeRepository rep;

    //Save operation
    @PostMapping("saveAnime")
    public Anime saveAnime(@RequestBody Anime anime) {
        return rep.save(anime);
    }
}
