package com.camerondix.carteira.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.camerondix.carteira.configuration.PlaidConfugrationProperties;
import com.camerondix.carteira.data.external.PlaidRepository;

@ExtendWith(MockitoExtension.class)
public class PlaidServiceTest {

    private PlaidService underTest;

    @Mock
    private AccountService accountService;

    @Mock
    private BalanceService balanceService;

    @Mock
    private TransactionService transactionService;

    @Mock
    private CategoryService categoryService;

    @Mock
    private PlaidRepository plaidRepository;

    @Mock
    private PlaidItemService plaidItemService;

    @Mock
    private PlaidConfugrationProperties plaidConfugrationProperties;

    @BeforeEach
    void setUp() {

        underTest = new PlaidService(accountService, balanceService, transactionService, plaidItemService,
                categoryService, plaidRepository, plaidConfugrationProperties);
    }

    @Test
    void testCreateItemSuccess() {

    }

    @Test
    void testCreateItemFailAccessTokenIsNull() {

    }

    @Test
    void testUpdateItem() {

    }

    @Test
    void testUpdateItemBalances() {

    }

    @Test
    void testUpdateItemTransactions() {

    }
}
