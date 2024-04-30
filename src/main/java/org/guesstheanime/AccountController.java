package org.guesstheanime;

import org.mindrot.jbcrypt.BCrypt;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@RestController
public class AccountController {

    private static final Logger logger = Logger.getLogger(AccountController.class.getName());

    @Autowired
    private AccountRepository rep;

    @PostMapping("/saveAccount")
    public void saveAccount(@RequestBody Account account) {
        try {
            String hashedPassword = BCrypt.hashpw(account.getPassword(), BCrypt.gensalt());
            account.setPassword(hashedPassword);

            rep.save(account);
            logger.info("Account saved successfully");
        }
        catch (Exception e) {
            logger.severe("Error in saveAccount: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        Account acc = rep.getReferenceById(email);

        if (acc != null) {
            String hashedPassword = acc.getPassword();

            // Check if the hashed password matches the input password after hashing
            if (BCrypt.checkpw(password, hashedPassword)) {
                // Passwords match, return the account
                return ResponseEntity.ok(acc);
            } else {
                // Passwords don't match, return unauthorized status
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
            }
        } else {
            // Account not found, return unauthorized status
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

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

    @GetMapping("/getAccount")
    public Account getAccount(@PathVariable String email) {
        try {
            Account acc = rep.getReferenceById(email);
            logger.info("Account retrieved successfully");
            return acc;
        }
        catch(Exception e) {
            logger.severe("Error in getAccount: " + e.getMessage());
            return null;
        }
    }
}
