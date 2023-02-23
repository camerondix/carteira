package com.camerondix.carteira.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camerondix.carteira.data.BalanceRepository;
import com.camerondix.carteira.model.entity.Balance;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BalanceService {

    private final BalanceRepository balanceRepository;
    private final AccountService accountService;

    @Autowired
    public BalanceService(BalanceRepository balanceRepository, AccountService accountService) {

        log.debug("Initializing balance service");
        this.balanceRepository = balanceRepository;
        this.accountService = accountService;
    }

    private Balance createIfChanged(@NonNull Balance balance) {

        log.debug("Creating balance {}", balance);
        var account = balance.getAccount();
        var currentBalance = account.getCurrentBalance();
        if (currentBalance != null) {
            currentBalance = retrieveById(currentBalance.getId());
        }
        if (currentBalance != null && currentBalance.valuesAreEqual(balance)) {
            currentBalance.setTimestamp(balance.getTimestamp());
            var savedBalance = balanceRepository.save(currentBalance);
            log.debug("Updated current balance timestamp {}", savedBalance);
            return savedBalance;
        } else {
            var addedBalance = balanceRepository.save(balance);
            account.setCurrentBalance(addedBalance);
            accountService.update(account);
            log.debug("Created balance ", addedBalance);
            return addedBalance;
        }
    }

    public List<Balance> createAllIfChanged(@NonNull List<Balance> balances) {

        return balances.stream().map(this::createIfChanged).toList();
    }

    public Balance retrieveById(@NonNull Integer id) {

        log.debug("Retrieving balance by id {}", id);
        var balance = balanceRepository.findById(id).orElseThrow();
        log.debug("Retrieved balance by id {}", balance.getId());
        return balance;
    }
}
