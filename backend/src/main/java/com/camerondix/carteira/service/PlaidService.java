package com.camerondix.carteira.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.camerondix.carteira.configuration.PlaidConfugrationProperties;
import com.camerondix.carteira.data.external.PlaidRepository;
import com.camerondix.carteira.model.TransactionUpdate;
import com.camerondix.carteira.model.entity.Account;
import com.camerondix.carteira.model.entity.Balance;
import com.camerondix.carteira.model.entity.PlaidItem;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PlaidService {

    private final AccountService accountService;
    private final BalanceService balanceService;
    private final TransactionService transactionService;
    private final PlaidItemService plaidItemService;
    private final CategoryService categoryService;
    private final PlaidRepository plaidRepository;
    private final PlaidConfugrationProperties plaidConfiguration;

    public PlaidService(AccountService accountService, BalanceService balanceService,
            TransactionService transactionService, PlaidItemService plaidItemService,
            CategoryService categoryService, PlaidRepository plaidRepository,
            PlaidConfugrationProperties plaidConfiguration) {

        log.debug("Initializing plaid service");
        this.accountService = accountService;
        this.balanceService = balanceService;
        this.transactionService = transactionService;
        this.plaidItemService = plaidItemService;
        this.categoryService = categoryService;
        this.plaidRepository = plaidRepository;
        this.plaidConfiguration = plaidConfiguration;
    }

    @Scheduled(cron = "0 0 5,17 * * *")
    public void updateAll() {

        var tokens = plaidConfiguration.getTokens();
        for (var token : tokens) {
            CompletableFuture.runAsync(() -> {
                try {
                    var item = getOrCreateByAccessToken(token);
                    updateItem(item.getPlaidId());
                    updateItemBalances(item.getPlaidId());
                    updateItemTransactions(item.getPlaidId());
                } catch (RuntimeException e) {
                    log.error("Failed to update account", e);
                }
            });
        }
    }

    private PlaidItem getOrCreateByAccessToken(String token) {

        try {
            return plaidItemService.retrieveByAccessToken(token);
        } catch (NoSuchElementException e) {
            return createItem(token);
        }
    }

    public PlaidItem createItem(@NonNull String accessToken) {

        log.debug("Creating item for access token {}", accessToken);
        var item = plaidRepository.retrieveItemForToken(accessToken);
        var accounts = accountService.createAll(item.getAccounts());
        item.setAccounts(accounts);
        var savedItem = plaidItemService.create(item);
        log.debug("Created item {}", savedItem);
        return savedItem;
    }

    public PlaidItem updateItem(@NonNull String plaidId) {

        log.debug("Updating item for plaid id {}", plaidId);
        var item = plaidItemService.retrieveByPlaidIdAndLoadAccountsThenCurrentBalance(plaidId);
        return updateItem(item);
    }

    private PlaidItem updateItem(@NonNull PlaidItem item) {

        var updatedItem = plaidRepository.retrieveItemForToken(item.getAccessToken());
        updatedItem.setId(item.getId());
        updatedItem.setTransactionCursor(item.getTransactionCursor());
        var updatedAccounts = new ArrayList<Account>();
        for (var account : updatedItem.getAccounts()) {
            try {
                var currentAccount = accountService.retrieveReferenceByExternalId(account.getExternalId());
                account.setId(currentAccount.getId());
                account.setName(currentAccount.getName());
                var updatedAccount = accountService.update(account);
                updatedAccounts.add(updatedAccount);
            } catch (NoSuchElementException e) {
                var addedAccount = accountService.create(account);
                updatedAccounts.add(addedAccount);
            }
        }
        updatedItem.setAccounts(updatedAccounts);
        var savedItem = plaidItemService.update(updatedItem);
        log.debug("Updated item {}", savedItem);
        return savedItem;
    }

    public List<Balance> updateItemBalances(@NonNull String plaidId) {

        log.debug("Updating item balance for plaid item id {}", plaidId);
        var item = plaidItemService.retrieveByPlaidIdAndLoadAccountsThenCurrentBalance(plaidId);
        return updateItemBalances(item);
    }

    private List<Balance> updateItemBalances(@NonNull PlaidItem item) {

        var updatedBalances = plaidRepository.retrieveBalancesForItem(item);
        var savedBalances = balanceService.createAllIfChanged(updatedBalances);
        log.debug("Updated item balance {}", savedBalances);
        return savedBalances;
    }

    public TransactionUpdate updateItemTransactions(@NonNull String plaidId) {

        log.debug("Updating item transactions for plaid item id {}", plaidId);
        var item = plaidItemService.retrieveByPlaidIdAndLoadAccounts(plaidId);
        return updateItemTransactions(item);
    }

    private TransactionUpdate updateItemTransactions(@NonNull PlaidItem item) {

        var transactionSync = plaidRepository.retrieveTransactionSync(item);
        var toRemove = transactionSync.getRemoved().stream()
                .map(transactionService::retrieveReferenceByExternalId)
                .collect(Collectors.toList());
        transactionService.deleteAll(toRemove);
        var toModify = transactionSync.getModified();
        toModify.forEach(t -> t.setId(
                transactionService.retrieveReferenceByExternalId(t.getExternalId()).getId()));
        toModify.forEach(t -> t
                .setCategory(categoryService.retrieveReferenceByName(t.getCategory().getName())));
        var modified = transactionService.updateAll(toModify);
        var toAdd = transactionSync.getAdded();
        toAdd.forEach(t -> t
                .setCategory(categoryService.retrieveReferenceByName(t.getCategory().getName())));
        var added = transactionService.createAll(transactionSync.getAdded());
        item.setTransactionCursor(transactionSync.getCursor());
        var updatedItem = plaidItemService.update(item);
        if (updatedItem.getTransactionCursor() == null) {
            log.error("why?");
        }
        var transactionUpdate = TransactionUpdate.builder().removed(transactionSync.getRemoved())
                .modified(modified).added(added).cursor(updatedItem.getTransactionCursor())
                .token(updatedItem.getAccessToken()).hasMore(transactionSync.isHasMore()).build();
        log.debug("Updated item transactions {}", transactionUpdate);
        return transactionUpdate;
    }
}
