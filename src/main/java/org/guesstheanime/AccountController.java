package org.guesstheanime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AccountController {

    @Autowired
    private AccountRepository rep;

    //Save operation
    @PostMapping("/saveAccount")
    public Account saveAccount(@RequestBody Account account) {
        return rep.save(account);
    }

    //Read operation
    @PostMapping("/listAccounts")
    public List<Account> fetchAccountList() {
        return rep.findAll();
    }

    @PostMapping("/updateAccount")
    public Account updateAccount(@RequestBody Account account) {
        return rep.save(account);
    }

    //Delete operation
    @DeleteMapping("/deleteAccount")
    public String deleteAccountById(@PathVariable String email) {
        rep.deleteById(email);
        return "Account deleted";
    }

    @GetMapping("/getHighscore")
    public int getHighscore(@PathVariable String email) {
        Account account = rep.getReferenceById(email);
        return account.getHighscore();
    }
}
