package com.camerondix.carteira.service;

import java.security.InvalidParameterException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camerondix.carteira.data.AccountRepository;
import com.camerondix.carteira.model.entity.Account;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AccountService {

    private final AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {

        log.debug("Initializing account service");
        this.accountRepository = accountRepository;
    }

    public Account create(@NonNull Account account) {

        log.debug("Creating account {}", account);
        var savedAccount = accountRepository.save(account);
        log.debug("Created account {}", savedAccount);
        return savedAccount;
    }

    public List<Account> createAll(@NonNull List<Account> accounts) {

        log.debug("Creating accounts {}", accounts);
        var savedAccounts = accountRepository.saveAll(accounts);
        log.debug("Created accounts {}", savedAccounts);
        return savedAccounts;
    }

    public Account retrieveById(@NonNull Integer id) {

        log.debug("Retrieving account by id {}", id);
        var account = accountRepository.findById(id).orElseThrow();
        log.debug("Retrieved account by id {}", account.getId());
        return account;
    }

    public List<Account> retrieveAll() {

        log.debug("Retrieving accounts");
        var accounts = accountRepository.findAll();
        log.debug("Retrieved accounts {}", accounts);
        return accounts;
    }

    public Account retrieveReferenceByExternalId(@NonNull String externalId) {

        log.debug("Retrieving account reference by external id {}", externalId);
        var account = Optional.ofNullable(accountRepository.getReferenceByExternalId(externalId)).orElseThrow();
        log.debug("Retrieved account reference id {}", account.getId());
        return account;
    }

    public Account update(@NonNull Account account) {

        log.debug("Updating account {}", account);
        if (account.getId() == null) {
            throw new InvalidParameterException("The account must have a valid id to be updated");
        }
        if (account.getCurrentBalance() == null) {
            var previousAccount = retrieveById(account.getId());
            account.setCurrentBalance(previousAccount.getCurrentBalance());
        }
        var savedAccount = accountRepository.save(account);
        log.debug("Updated account {}", savedAccount);
        return savedAccount;
    }

    public Account loadCurrentBalance(@NonNull Account account) {

        log.debug("Loading current balance for account {}", account);
        account.getCurrentBalance();
        log.debug("Loaded current balance for account {}", account);
        return account;
    }
}
