package org.guesstheanime;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.logging.Logger;

@RestController
public class AccountController {

    private static final Logger logger = Logger.getLogger(AccountController.class.getName());

    @Autowired
    private AccountRepository rep;

    /*
    private String encryptPassword(String password) {
        //TODO; encrpyt password here, in saveAccount create a new account object with the account values and the new encrypted password
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hashedPassword = encoder.encode(password);
        return hashedPassword;
    }

    private boolean checkPassword(String password, String hashedPassword) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if(encoder.matches(password, hashedPassword)) {
            return true;
        }
        return false;
    }

     */

    //Save operation
    @PostMapping("/saveAccount")
    public void saveAccount(@RequestBody Account account) {
        try {
            //Account acc = new Account(account.getEmail(), account.getFirstname(), account.getLastname(), encryptPassword(account.getPassword()), account.getHighscore());
            rep.save(account);
            logger.info("Account saved successfully");
        }
        catch (Exception e) {
            logger.severe("Error in saveAccount: " + e.getMessage());
        }
    }

    //Read operation
    @PostMapping("/listAccounts")
    public List<Account> fetchAccountList() {
        try {
            List<Account> accountList = rep.findAll();
            logger.info("Account updated successfully");
            return accountList;
        }
        catch(Exception e) {
            logger.severe("Error in fetchAccountList: " + e.getMessage());
            return null;
        }
    }

    @PostMapping("/updateAccount")
    public Account updateAccount(@RequestBody Account account) {
        try {
            Account acc = rep.save(account);
            logger.info("Account updated successfully");
            return acc;
        }
        catch(Exception e) {
            logger.severe("Error in updateAccount: " + e.getMessage());
            return null;
        }
    }

    //Delete operation
    @DeleteMapping("/deleteAccount")
    public void deleteAccountById(@PathVariable String email) {
        try {
            rep.deleteById(email);
            logger.info("Account deleted successfully");
        }
        catch(Exception e) {
            logger.severe("Error in deleteAccountById: " + e.getMessage());
        }
    }
    @GetMapping("/getHighscore")
    public int getHighscore(@PathVariable String email) {
        try {
            Account acc = rep.getReferenceById(email);
            logger.info("Highscore retrieved successfully");
            return acc.getHighscore();
        }
        catch(Exception e) {
            logger.severe("Error in getHighscore: " + e.getMessage());
            return 0;
        }
    }
}
