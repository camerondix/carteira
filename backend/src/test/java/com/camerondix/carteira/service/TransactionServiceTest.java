package com.camerondix.carteira.service;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.security.InvalidParameterException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

import org.assertj.core.api.ThrowableAssert.ThrowingCallable;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.camerondix.carteira.data.TransactionRepository;
import com.camerondix.carteira.model.entity.Account;
import com.camerondix.carteira.model.entity.Category;
import com.camerondix.carteira.model.entity.Transaction;

@ExtendWith(MockitoExtension.class)
public class TransactionServiceTest {

    private TransactionService underTest;

    @Mock
    private TransactionRepository transactionRepository;

    @BeforeEach
    void setUp() {

        underTest = new TransactionService(transactionRepository);
    }

    @Test
    void testCreateAllSuccess() {

        // given
        var category = mock(Category.class);
        var account = mock(Account.class);

        var transactions = List.of(
                Transaction.builder()
                        .account(account)
                        .category(category)
                        .name("transaction1")
                        .timestamp(LocalDateTime.now())
                        .build(),
                Transaction.builder()
                        .account(account)
                        .category(category)
                        .name("transaction2")
                        .timestamp(LocalDateTime.now())
                        .build());

        // when
        underTest.createAll(transactions);

        // then
        @SuppressWarnings("unchecked")
        ArgumentCaptor<Iterable<Transaction>> capture = ArgumentCaptor.forClass(Iterable.class);
        verify(transactionRepository).saveAll(capture.capture());
        assertThat(capture.getValue()).isEqualTo(transactions);
    }

    @Test
    void testCreateAllFailTransactionsAreNull() {

        // when
        ThrowingCallable actual = () -> underTest.createAll(null);

        // then
        assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageContaining("transactions");
    }

    @Test
    void testRetrieveReferenceByExternalId() {

        // given
        var externalId = "externalId";

        when(transactionRepository.getReferenceByExternalId(anyString())).thenReturn(mock(Transaction.class));

        // when
        underTest.retrieveReferenceByExternalId(externalId);

        // then
        var capture = ArgumentCaptor.forClass(String.class);
        verify(transactionRepository).getReferenceByExternalId(capture.capture());
        assertThat(capture.getValue()).isEqualTo(externalId);
    }

    @Test
    void testRetrieveReferenceByExternalIdFailNotFound() {

        // given
        var externalId = "externalId";

        when(transactionRepository.getReferenceByExternalId(anyString())).thenReturn(null);

        // when
        ThrowingCallable actual = () -> underTest.retrieveReferenceByExternalId(externalId);

        // then
        assertThatThrownBy(actual).isInstanceOf(NoSuchElementException.class);
    }

    @Test
    void testRetrieveReferenceByExternalIdFailExternalIdIsNull() {

        // when
        ThrowingCallable actual = () -> underTest.retrieveReferenceByExternalId(null);

        // then
        assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageContaining("externalId");
    }

    @Test
    void testUpdateAllSuccess() {

        // given
        var category = mock(Category.class);
        var account = mock(Account.class);

        var transactions = List.of(
                Transaction.builder()
                        .id(1)
                        .account(account)
                        .category(category)
                        .name("transaction1")
                        .timestamp(LocalDateTime.now())
                        .build(),
                Transaction.builder()
                        .id(2)
                        .account(account)
                        .category(category)
                        .name("transaction2")
                        .timestamp(LocalDateTime.now())
                        .build());

        // when
        underTest.updateAll(transactions);

        // then
        @SuppressWarnings("unchecked")
        ArgumentCaptor<Iterable<Transaction>> capture = ArgumentCaptor.forClass(Iterable.class);
        verify(transactionRepository).saveAll(capture.capture());
        assertThat(capture.getValue()).isEqualTo(transactions);
    }

    @Test
    void testUpdateAllFailIdIsNull() {

        // given
        var category = mock(Category.class);
        var account = mock(Account.class);

        var transactions = List.of(
                Transaction.builder()
                        .id(1)
                        .account(account)
                        .category(category)
                        .name("transaction1")
                        .timestamp(LocalDateTime.now())
                        .build(),
                Transaction.builder()
                        .account(account)
                        .category(category)
                        .name("transaction2")
                        .timestamp(LocalDateTime.now())
                        .build());

        // when
        ThrowingCallable actual = () -> underTest.updateAll(transactions);

        // then
        assertThatThrownBy(actual).isInstanceOf(InvalidParameterException.class).hasMessageContaining("id");

        verify(transactionRepository, never()).saveAll(any());
    }

    @Test
    void testUpdateAllFailTransactionsAreNull() {

        // when
        ThrowingCallable actual = () -> underTest.updateAll(null);

        // then
        assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageContaining("transactions");
    }

    @Test
    void testDeleteAllSuccess() {

        // given
        var category = mock(Category.class);
        var account = mock(Account.class);

        var transactions = List.of(
                Transaction.builder()
                        .id(1)
                        .account(account)
                        .category(category)
                        .name("transaction1")
                        .timestamp(LocalDateTime.now())
                        .build(),
                Transaction.builder()
                        .id(2)
                        .account(account)
                        .category(category)
                        .name("transaction2")
                        .timestamp(LocalDateTime.now())
                        .build());

        // when
        underTest.deleteAll(transactions);

        // then
        @SuppressWarnings("unchecked")
        ArgumentCaptor<Iterable<Transaction>> capture = ArgumentCaptor.forClass(Iterable.class);
        verify(transactionRepository).deleteAll(capture.capture());
        assertThat(capture.getValue()).isEqualTo(transactions);
    }

    @Test
    void testDeleteAllFailIdIsNull() {

        // given
        var category = mock(Category.class);
        var account = mock(Account.class);

        var transactions = List.of(
                Transaction.builder()
                        .id(1)
                        .account(account)
                        .category(category)
                        .name("transaction1")
                        .timestamp(LocalDateTime.now())
                        .build(),
                Transaction.builder()
                        .account(account)
                        .category(category)
                        .name("transaction2")
                        .timestamp(LocalDateTime.now())
                        .build());

        // when
        ThrowingCallable actual = () -> underTest.deleteAll(transactions);

        // then
        assertThatThrownBy(actual).isInstanceOf(InvalidParameterException.class).hasMessageContaining("id");

        verify(transactionRepository, never()).deleteAll(any());
    }

    @Test
    void testDeleteAllFailTransactionsAreNull() {

        // when
        ThrowingCallable actual = () -> underTest.deleteAll(null);

        // then
        assertThatThrownBy(actual).isInstanceOf(NullPointerException.class).hasMessageContaining("transactions");
    }
}
