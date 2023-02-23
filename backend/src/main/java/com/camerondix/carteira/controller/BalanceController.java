package com.camerondix.carteira.controller;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import com.camerondix.carteira.model.entity.Account;
import com.camerondix.carteira.model.entity.Balance;
import com.camerondix.carteira.service.AccountService;
import com.camerondix.carteira.service.BalanceService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class BalanceController {

    private final AccountService accountService;

    private final BalanceService balanceService;

    public BalanceController(AccountService accountService, BalanceService balanceService) {

        log.debug("Initializing account controller");
        this.accountService = accountService;
        this.balanceService = balanceService;
    }

    @QueryMapping
    public Balance balance(@Argument Integer id) {

        log.debug("Getting balance from id {}", id);
        return balanceService.retrieveById(id);
    }

    @SchemaMapping
    public Account account(Balance balance) {
        log.debug("Loading account for balance {}", balance);
        return accountService.retrieveById(balance.getAccount().getId());
    }
}
