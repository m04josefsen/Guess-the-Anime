package org.guesstheanime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AccountController {

    @Autowired
    private AccountService accountService;

    //Save operation
    @PostMapping("/accounts")
    public Account saveAccount(@RequestBody Account account) {
        return accountService.saveAccount(account);
    }

    //Read operation
    @PostMapping("/accounts")
    public List<Account> fetchAccountList() {
        return accountService.fetchAccountList();
    }

    //Update operation
    @PutMapping("/accounts/{id}")
    public Account updateAccount(@RequestBody Account account, @PathVariable Long id) {
        return accountService.updateAccount(account, id);
    }

    //Delete operation
    @DeleteMapping("/accounts/{id}")
    public String deleteAccountById(@PathVariable Long id) {
        accountService.deleteAccountById(id);
        return "Account deleted";
    }
}
