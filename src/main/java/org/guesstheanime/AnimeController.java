package org.guesstheanime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.logging.Logger;

@RestController
public class AnimeController {

    private static final Logger logger = Logger.getLogger(AnimeController.class.getName());

    @Autowired
    AnimeRepository rep;

    @PostMapping("/saveAnime")
    public Anime saveAnime(@RequestBody Anime anime) {
        try {
            Anime ani = rep.save(anime);
            logger.info("Anime saved successfully");
            return ani;
        }
        catch(Exception e) {
            logger.severe("Error in saveAnime: " + e.getMessage());
            return null;
        }
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
        try {
            List<Anime> list = rep.findAll();
            logger.info("Getting random anime successfully");
            return list.get(getRandomNumber0and25());
        }
        catch(Exception e) {
            logger.severe("Error in getRandomAnime: " + e.getMessage());
            return null;
        }
    }

    public int getRandomNumber0and25() {
        try {
            Random rand = new Random();
            logger.info("Getting random number successfully");
            return rand.nextInt(25);
        }
        catch(Exception e) {
            logger.severe("Error in getRandomNumber0and25: " + e.getMessage());
            return 0;
        }
    }
}