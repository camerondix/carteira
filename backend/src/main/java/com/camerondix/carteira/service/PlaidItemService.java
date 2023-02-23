package com.camerondix.carteira.service;

import java.security.InvalidParameterException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.camerondix.carteira.data.PlaidItemRepository;
import com.camerondix.carteira.model.entity.Account;
import com.camerondix.carteira.model.entity.PlaidItem;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class PlaidItemService {

    private final PlaidItemRepository plaidItemRepository;

    @Autowired
    public PlaidItemService(PlaidItemRepository plaidItemRepository) {

        log.debug("Initializing plaid item service");
        this.plaidItemRepository = plaidItemRepository;
    }

    public PlaidItem create(@NonNull PlaidItem plaidItem) {

        log.debug("Creating plaid item {}", plaidItem);
        var savedPlaidItem = plaidItemRepository.save(plaidItem);
        log.debug("Created plaid item {}", savedPlaidItem);
        return savedPlaidItem;
    }

    public PlaidItem retrieveByPlaidId(@NonNull String plaidId) {

        log.debug("Retrieving by plaid id {}", plaidId);
        var plaidItem = plaidItemRepository.findByPlaidId(plaidId).orElseThrow();
        log.debug("Retrieved plaid item {}", plaidItem);
        return plaidItem;
    }

    public PlaidItem retrieveByPlaidIdAndLoadAccounts(@NonNull String plaidId) {

        return loadAccounts(retrieveByPlaidId(plaidId));
    }

    public PlaidItem retrieveByPlaidIdAndLoadAccountsThenCurrentBalance(@NonNull String plaidId) {

        return loadAccountsThenLoadCurrentBalance(retrieveByPlaidId(plaidId));
    }

    public PlaidItem retrieveByAccessToken(String accessToken) {

        log.debug("Retrieving by access token {}", accessToken);
        var plaidItem = plaidItemRepository.findByAccessToken(accessToken).orElseThrow();
        log.debug("Retrieved plaid item {}", plaidItem);
        return plaidItem;
    }

    private PlaidItem loadAccounts(PlaidItem plaidItem) {

        log.debug("Loading accounts for plaid item {}", plaidItem);
        plaidItem.getAccounts().forEach(Account::getName);
        log.debug("Loaded accounts for plaid item {}", plaidItem);
        return plaidItem;
    }

    private PlaidItem loadAccountsThenLoadCurrentBalance(PlaidItem plaidItem) {

        loadAccounts(plaidItem);
        log.debug("Loading account current balances for plaid item {}", plaidItem);
        plaidItem.getAccounts().stream().forEach(Account::getCurrentBalance);
        log.debug("Loaded account current balances for plaid item {}", plaidItem);
        return plaidItem;
    }

    public PlaidItem update(@NonNull PlaidItem plaidItem) {

        log.debug("Updating plaid item", plaidItem);
        if (plaidItem.getId() == null) {
            throw new InvalidParameterException(
                    "The plaid item must have a valid id to be updated");
        }
        var savedPlaidItem = plaidItemRepository.save(plaidItem);
        log.debug("Updated plaid item {}", savedPlaidItem);
        return savedPlaidItem;
    }
}
