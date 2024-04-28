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

    //Update operation
    /*
    @PostMapping("/updateAccount")
    public Account updateAccount(@RequestBody Account account, @PathVariable Long id) {
        return rep.save(account, id);
    }
     */
    @PostMapping("/updateAccount")
    public Account updateAccount(@RequestBody Account account) {
        return rep.save(account);
    }

    //Delete operation
    @DeleteMapping("/deleteAccount")
    public String deleteAccountById(@PathVariable Long id) {
        rep.deleteById(id);
        return "Account deleted";
    }
}
