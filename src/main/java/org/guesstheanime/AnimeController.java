package org.guesstheanime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AnimeController {

    @Autowired
    AnimeRepository rep;

    @PostMapping("/saveAnime")
    public Anime saveAnime(@RequestBody Anime anime) {
        return rep.save(anime);
    }

    @GetMapping("/getAllAnimes")
    public List<Anime> getAllAnimes() {
        return rep.findAll();
    }

    /*
    @GetMapping("/getAnime")
    public Anime getAnime(@RequestParam int randomNumber) {
        return rep.
    }
     */
}
