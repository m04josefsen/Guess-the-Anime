package org.guesstheanime;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    //Save operation
    public Account saveAccount(Account account) {
        return accountRepository.save(account);
    }

    //Read operation
    public List<Account> fetchAccountList() {
        return accountRepository.findAll();
    }

    //Update operation
    public Account updateAccount(Account account, Long accountId) {
        return accountRepository.updateAccount(account, accountId);
    }

    //Delete operation
    public void deleteAccountById(Long accountId) {
        accountRepository.deleteById(accountId);
    }
}
