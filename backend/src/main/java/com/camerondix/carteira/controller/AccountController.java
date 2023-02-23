package com.camerondix.carteira.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import com.camerondix.carteira.model.entity.Account;
import com.camerondix.carteira.model.entity.Balance;
import com.camerondix.carteira.model.entity.CreditInfo;
import com.camerondix.carteira.model.entity.DepositoryInfo;
import com.camerondix.carteira.model.input.AccountInput;
import com.camerondix.carteira.service.AccountService;
import com.camerondix.carteira.service.BalanceService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class AccountController {

    private final AccountService accountService;

    private final BalanceService balanceService;

    public AccountController(AccountService accountService, BalanceService balanceService) {

        log.debug("Initializing account controller");
        this.accountService = accountService;
        this.balanceService = balanceService;
    }

    @QueryMapping
    public Account account(@Argument Integer id) {

        log.debug("Getting account from id {}", id);
        return accountService.retrieveById(id);
    }

    @QueryMapping
    public List<Account> accounts() {

        log.debug("Getting accounts");
        var accounts = accountService.retrieveAll();
        accounts.sort((a1, a2) -> a1.getName().compareTo(a2.getName()));
        return accounts;
    }

    @SchemaMapping
    public Balance currentBalance(Account account) {

        log.debug("Loading current balance for account {}", account);
        try {
            if (account.getCurrentBalance() == null)
                return null;
            return balanceService.retrieveById(account.getCurrentBalance().getId());
        } catch (NoSuchElementException e) {
            return null;
        }
    }

    @SchemaMapping
    public DepositoryInfo depositoryInfo(Account account) {

        return account.getDepositoryInfo();
    }

    @SchemaMapping
    public CreditInfo creditInfo(Account account) {

        return account.getCreditInfo();
    }

    @MutationMapping
    public Account updateAccount(@Argument AccountInput input) {

        log.debug("Updating account from input {}", input);
        var account = accountService.retrieveById(input.getId());
        account.setName(input.getName());
        return accountService.update(account);
    }
}
