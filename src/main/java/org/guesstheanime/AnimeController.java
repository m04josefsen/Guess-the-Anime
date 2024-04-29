package org.guesstheanime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
public class AnimeController {

    @Autowired
    AnimeRepository rep;

    @PostMapping("/saveAnime")
    public Anime saveAnime(@RequestBody Anime anime) {
        return rep.save(anime);
    }

    @GetMapping("/getRandomAnimes")
    public List<Anime> getRandomAnimes() {
        List<Anime> list = new ArrayList<>();
        list.add(getRandomAnime());
        while(list.size() != 4) {
            Anime temp = getRandomAnime();
            boolean isDuplicate = false;

            for(Anime a : list) {
                if(a == temp) {
                    isDuplicate = true;
                    break;
                }
            }
            if(!isDuplicate) {
                list.add(temp);
            }
        }
        return list;
    }

    public Anime getRandomAnime() {
        List<Anime> list = rep.findAll();
        return list.get(getRandomNumber0and25());
    }

    public int getRandomNumber0and25() {
        Random rand = new Random();
        return rand.nextInt(25);
    }
}