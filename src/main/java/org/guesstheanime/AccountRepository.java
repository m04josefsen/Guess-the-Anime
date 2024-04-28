package org.guesstheanime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Account saveAccount(Account account);

    List<Account> fetchAllAccounts();

    Account updateAccount(Account account, Long id);

    void deleteAccountById(Long id);
}
